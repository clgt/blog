package http

import (
	"crypto/md5"
	"errors"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/alexedwards/flow"
	"github.com/clgt/blog/internal/config"
	"github.com/clgt/blog/internal/email"
	"github.com/clgt/blog/internal/form"
	"github.com/clgt/blog/internal/helper"
	"github.com/clgt/blog/internal/models"
	"github.com/clgt/blog/internal/pagination"
	"github.com/clgt/blog/internal/sql"
	"github.com/golangcollege/sessions"
)

type Server struct {
	server    *http.Server
	router    *flow.Mux
	html      map[string]*template.Template
	adminHtml map[string]*template.Template
	session   *sessions.Session

	// services
	PostService    *sql.PostService
	UserService    *sql.UserService
	CommentService *sql.CommentService

	// slc service
	sql.Queries
}

var server *Server

func NewServer(cfg *config.Config) *Server {
	mux := flow.New()

	session := sessions.New([]byte("strongest_key_ever"))
	session.Lifetime = 24 * time.Hour * 30 // 1 month

	s := &Server{
		server: &http.Server{
			Addr:         cfg.ListenAddress,
			ReadTimeout:  15 * time.Second,
			WriteTimeout: 30 * time.Second,
			IdleTimeout:  150 * time.Second,
			Handler:      session.Enable(mux),
		},
		router:  mux,
		html:    make(map[string]*template.Template),
		session: session,
	}

	// user routes
	s.router.HandleFunc("/", s.home, "GET")
	s.router.HandleFunc("/register", s.register, "GET", "POST")
	s.router.HandleFunc("/login", s.login, "GET", "POST")
	s.router.HandleFunc("/logout", s.logout, "GET")
	s.router.HandleFunc("/profile", use(s.profile, s.isLogined), "GET")
	s.router.HandleFunc("/check-email/:type", s.checkEmail, "GET")
	s.router.HandleFunc("/change-password", s.changePassword, "GET", "POST")
	s.router.HandleFunc("/forgot-password", s.forgotPassword, "GET", "POST")
	s.router.HandleFunc("/verify-email", s.verifyEmailResult, "GET")
	s.router.HandleFunc("/send-email", s.sendEmail, "POST")
	s.router.HandleFunc("/blogs", s.posts, "GET")
	s.router.HandleFunc("/blogs/:slug", s.postDetails, "GET")
	s.router.HandleFunc("/blogs/:slug/comments/new", use(s.createComment, s.isLogined), "POST")

	// admin routes
	s.router.HandleFunc("/admin", use(s.adminHome, s.isadmin), "GET")
	s.router.HandleFunc("/admin/posts", use(s.adminPosts, s.isadmin), "GET")
	s.router.HandleFunc("/admin/posts/new", use(s.adminCreatePost, s.isadmin), "GET", "POST")
	s.router.HandleFunc("/admin/posts/:id/edit", use(s.adminUpdatePost, s.isadmin), "GET", "POST")
	s.router.HandleFunc("/admin/posts/:id/remove", use(s.adminRemovePost, s.isadmin), "GET")
	s.router.HandleFunc("/admin/comments", use(s.adminComments, s.isadmin), "GET")
	s.router.HandleFunc("/admin/comments/:id/hide", use(s.adminHideComment, s.isadmin), "GET")
	s.router.HandleFunc("/admin/comments/:id/remove", use(s.adminRemoveComment, s.isadmin), "GET")
	s.router.HandleFunc("/admin/users", use(s.adminUsers, s.isadmin), "GET")
	s.router.HandleFunc("/admin/users/:id/block", use(s.adminBlockUser, s.isadmin), "GET")
	s.router.HandleFunc("/admin/users/:id/remove", use(s.adminRemoveUser, s.isadmin), "GET")

	// static files
	fs := http.FileServer(http.Dir(filepath.Join("theme", "basic", "static")))
	s.router.Handle("/static/...", http.StripPrefix("/static", fs))

	server = s
	return s
}

func (s *Server) Open() (err error) {
	go s.server.ListenAndServe()
	if s.html, err = parseTheme("basic"); err != nil {
		return
	}
	if s.adminHtml, err = parseTheme("admin"); err != nil {
		return
	}
	return
}

func (s *Server) Close() (err error) {
	return
}

func (s *Server) posts(w http.ResponseWriter, r *http.Request) {
	posts, total, err := s.PostService.FindPosts(r.Context(), models.PostFilter{
		IsPublished:        true,
		InPublicationOrder: true,
	})
	if err != nil {
		log.Println(err)
	}

	p := pagination.New(r.URL).SetTotal(total).Generate()
	left, right := p.GetDataBound()

	s.render(w, r, "posts.html", &templateData{
		Posts:      posts[left:right],
		Pagination: p,
	})
}

func (s *Server) postDetails(w http.ResponseWriter, r *http.Request) {
	slug := flow.Param(r.Context(), "slug")

	post, err := s.PostService.FindBySlug(r.Context(), slug)
	if err != nil {
		handleError(w, r, err)
		return
	}

	comments, total, err := s.CommentService.FindBySlug(r.Context(), slug)
	if err != nil {
		handleError(w, r, err)
		return
	}

	p := pagination.New(r.URL).SetTotal(total).Generate()
	left, right := p.GetDataBound()

	s.render(w, r, "posts.details.html", &templateData{
		Post:       post,
		Comments:   comments[left:right],
		Pagination: p,
	})
}

func (s *Server) home(w http.ResponseWriter, r *http.Request) {
	s.render(w, r, "home.html", &templateData{})
}

func (s *Server) register(w http.ResponseWriter, r *http.Request) {
	f := form.New(nil)

	var ok bool
	defer func() {
		if !ok {
			s.render(w, r, "register.html", &templateData{
				Form: f,
			})
			return
		}

	}()

	// nếu đã login thì ko show nữa
	if s.session.GetInt(r, "user") > 0 {
		ok = true
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	if r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			log.Println(err)
			f.Errors.Add("err", "err_parse_form")
			return
		}

		f.Values = r.PostForm
		f.Required("Username", "Password", "PasswordConfirmation", "Email")

		if !f.Valid() {
			log.Println("form invalid", f.Errors)
			f.Errors.Add("err", "err_invalid_form")
			return
		}

		// check password
		if f.Get("Password") != f.Get("PasswordConfirmation") {
			f.Errors.Add("err", "err_password_not_match")
			return
		}

		user, err := s.UserService.Create(r.Context(), &models.User{
			Username: f.Get("Username"),
			Password: f.Get("Password"),
			Email:    f.Get("Email"),
		})
		if err != nil {
			log.Println(err)
			f.Errors.Add("err", "err_could_not_create_user")
			return
		}

		s.session.Put(r, "user", user.ID)

		if err := s.UserService.LogSendVerifyEmail(r.Context(), user); err != nil {
			log.Println(err)
		}

		// reload user
		user, err = s.UserService.FindByID(r.Context(), user.ID)
		if err != nil {
			log.Println(err)
		}

		log.Println(user)

		// gởi email verify
		email.PostmarkApiToken = "?"
		email.Domain = "http://localhost:3000"
		if err := email.SendVerifyEmail(user); err != nil {
			log.Println(err)
		}

		ok = true
		http.Redirect(w, r, "/check-email/verify", http.StatusSeeOther)
	}
}

func (s *Server) login(w http.ResponseWriter, r *http.Request) {
	redirectTo := r.URL.Query().Get("redirect_to")
	f := form.New(nil)

	var ok bool
	defer func() {
		if !ok {
			s.render(w, r, "login.html", &templateData{
				Form: f,
			})
		}
	}()

	// nếu đã login thì ko show nữa
	if s.session.GetInt(r, "user") > 0 {
		ok = true
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	if r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			f.Errors.Add("err", "err_parse_form")
			return
		}

		f.Values = r.PostForm
		f.Required("Username", "Password")

		if !f.Valid() {
			log.Println("form invalid", f.Errors)
			f.Errors.Add("err", "err_invalid_form")
			return
		}

		user, err := s.UserService.Auth(r.Context(), &models.User{
			Username: f.Get("Username"),
			Password: f.Get("Password"),
		})
		if err != nil {
			log.Println(err)
			f.Errors.Add("err", "msg_invalid_login")
			return
		}
		fmt.Println("DEBUG", "login", "success", user.ID)
		ok = true
		s.session.Put(r, "user", user.ID)

		if redirectTo == "" {
			redirectTo = r.Header.Get("Referer")
		}

		http.Redirect(w, r, redirectTo, http.StatusSeeOther)
	}
}

func (s *Server) logout(w http.ResponseWriter, r *http.Request) {
	s.session.Remove(r, "user")
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func (s *Server) profile(w http.ResponseWriter, r *http.Request) {
	userId := s.session.GetInt(r, "user")
	user, err := s.UserService.FindByID(r.Context(), userId)

	if err != nil {
		log.Println(err)
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	s.render(w, r, "profile.html", &templateData{
		User: user,
	})
}

func (s *Server) checkEmail(w http.ResponseWriter, r *http.Request) {
	userId := s.session.GetInt(r, "user")
	f := form.New(nil)

	ok := false
	defer func() {
		if !ok {
			s.render(w, r, "check.email.html", &templateData{
				Form: f,
			})
		}
	}()

	email_type := flow.Param(r.Context(), "type")
	if email_type == "verify" {
		if userId <= 0 {
			ok = true
			http.Redirect(w, r, "/login", http.StatusSeeOther)
			return
		}

		user, err := s.UserService.FindByID(r.Context(), userId)
		if err != nil {
			handleError(w, r, err)
			return
		}

		if helper.Contains("verified_email", user.Roles) {
			f.Set("Message", "Your email has been verified")
			return
		}

		// check if the token is expired
		isExpired := time.Unix(user.SendVerifiedEmailAt.Unix()+3600*24*7, 0).UTC().Before(time.Now().UTC())
		if !isExpired {
			f.Set("Message", "Please check your email to verify your email address")
			return
		}

		// email was expired
		f.Set("Message", "Your email token has expired, please click the button below to resend verify email")
		f.Set("UserID", fmt.Sprintf("%d", user.ID))
		f.Set("Email", user.Email)

	} else if email_type == "reset" {
		if userId > 0 {
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}
		f.Set("Message", "Please check your email to reset your password")
	} else {
		f.Set("Message", "Invalid email type")
	}
}

func (s *Server) sendEmail(w http.ResponseWriter, r *http.Request) {
	userId := s.session.GetInt(r, "user")
	f := form.New(nil)

	if userId > 0 && r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			handleError(w, r, err)
			return
		}

		f.Values = r.PostForm
		f.Required("Email")

		if !f.Valid() {
			handleError(w, r, errors.New("invalid form"))
			return
		}

		user, err := s.UserService.FindByID(r.Context(), userId)
		if err != nil {
			handleError(w, r, err)
			return
		}

		if helper.Contains("verified_email", user.Roles) {
			http.Redirect(w, r, "/check-email/verify", http.StatusSeeOther)
			return
		}

		// check if the token is expired
		isExpired := time.Unix(user.SendVerifiedEmailAt.Unix()+3600*24*7, 0).UTC().Before(time.Now().UTC())
		if !isExpired {
			http.Redirect(w, r, "/check-email/verify", http.StatusSeeOther)
			return
		}

		user.Email = r.PostForm.Get("Email")
		log.Println(user)

		if err := s.UserService.LogSendVerifyEmail(r.Context(), user); err != nil {
			handleError(w, r, err)
			return
		}

		// reload user
		user, err = s.UserService.FindByID(r.Context(), user.ID)
		if err != nil {
			handleError(w, r, err)
			return
		}

		log.Println(user)

		// gởi email verify
		email.PostmarkApiToken = "?"
		email.Domain = "http://localhost:3000"
		if err := email.SendVerifyEmail(user); err != nil {
			log.Println(err)
		}
	}

	http.Redirect(w, r, "/check-email/verify", http.StatusSeeOther)
}

func (s *Server) changePassword(w http.ResponseWriter, r *http.Request) {
	f := form.New(nil)
	ok := false

	defer func() {
		if !ok {
			s.render(w, r, "password.change.html", &templateData{
				Form: f,
			})
		}
	}()

	userId := s.session.GetInt(r, "user")
	// not login means forgot password
	if userId <= 0 {
		f.Set("ForgotPassword", "1")
		// check hash
		eat := r.URL.Query().Get("eat")
		token := r.URL.Query().Get("token")
		sign := r.URL.Query().Get("sign")

		qs := fmt.Sprintf("blog:%s:%s:blog", token, eat)

		if fmt.Sprintf("%x", md5.Sum([]byte(qs))) != sign {
			log.Println("url sign không đúng")
			f.Errors.Add("err", "err_token_invalid")
			return
		}

		// nếu ko có, hoặc ko parse dc eat, thì xem như expired
		expiredAt, err := strconv.ParseInt(eat, 10, 64)

		if err != nil {
			log.Println(err)
			f.Errors.Add("err", "err_token_missing")
			return
		}

		isExpired := time.Unix(expiredAt, 0).UTC().Before(time.Now().UTC())
		if isExpired {
			log.Println(time.Unix(expiredAt, 0).UTC())
			f.Errors.Add("err", "err_token_expired")
			return
		}

		// find user by the token
		user, err := s.UserService.FindByRPT(r.Context(), token)
		if err != nil {
			log.Println(err)
			f.Errors.Add("err", "err_token_invalid")
		}

		f.Set("UserID", fmt.Sprintf("%d", user.ID))
	}

	if r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			f.Errors.Add("err", "err_parse_form")
			return
		}

		if f.Get("UserID") != "" {
			userId, _ = strconv.Atoi(f.Get("UserID"))
			r.PostForm.Set("UserID", f.Get("UserID"))
			r.PostForm.Set("ForgotPassword", "1")
		}

		f.Values = r.PostForm
		f.Required("Password", "PasswordConfirmation")

		if f.Get("Password") != f.Get("PasswordConfirmation") {
			f.Errors.Add("err", "err_password_not_match")
			return
		}

		if !f.Valid() {
			log.Println("form invalid", f.Errors)
			f.Errors.Add("err", "err_invalid_form")
			return
		}

		user, _ := s.UserService.FindByID(r.Context(), userId)
		log.Println("user", user)
		if user != nil {
			if f.Get("OldPassword") != "" {
				err := s.UserService.CompareHashAndPassword(user.Password, f.Get("OldPassword"))
				if err != nil {
					log.Println("Old password invalid", f.Get("OldPassword"))
					f.Errors.Add("err", "err_invalid_old_password")
					return
				}
			}

			err := s.UserService.CompareHashAndPassword(user.Password, f.Get("Password"))
			if err == nil {
				log.Println("New password invalid", f.Get("Password"))
				f.Errors.Add("err", "err_invalid_new_password")
				return
			}

			s.UserService.UpdatePassword(r.Context(), &models.User{
				ID:       userId,
				Password: f.Get("Password"),
			})
		}

		ok = true
		http.Redirect(w, r, "/login", http.StatusSeeOther)
	}
}

func (s *Server) forgotPassword(w http.ResponseWriter, r *http.Request) {
	f := form.New(nil)
	ok := false

	userId := s.session.GetInt(r, "user")
	// redirect if logged in
	if userId > 0 {
		ok = true
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	defer func() {
		if !ok {
			s.render(w, r, "password.forgot.html", &templateData{
				Form: f,
			})
		}
	}()

	if r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			log.Println(err)
			f.Errors.Add("err", "err_parse_form")
			return
		}

		f.Values = r.PostForm
		f.Required("Email")

		if !f.Valid() {
			log.Println("form invalid", f.Errors)
			f.Errors.Add("err", "err_invalid_form")
			return
		}

		user, err := s.UserService.LogSendResetPassword(r.Context(), f.Get("Email"))
		if err != nil {
			log.Println(err)
			f.Errors.Add("err", err.Error())
			return
		}

		log.Println(user)

		// gởi email verify
		email.PostmarkApiToken = "?"
		email.Domain = "http://localhost:3000"
		if err := email.SendResetPasswordEmail(user); err != nil {
			log.Println(err)
		}

		ok = true
		http.Redirect(w, r, "/check-email/reset", http.StatusSeeOther)
	}
}

func (s *Server) verifyEmailResult(w http.ResponseWriter, r *http.Request) {
	f := form.New(nil)

	defer func() {
		s.render(w, r, "result.email.html", &templateData{
			Form: f,
		})
	}()

	// check hash
	iat := r.URL.Query().Get("iat")
	token := r.URL.Query().Get("token")
	sign := r.URL.Query().Get("sign")

	qs := fmt.Sprintf("blog:%s:%s:blog", token, iat)

	if fmt.Sprintf("%x", md5.Sum([]byte(qs))) != sign {
		log.Println("url sign không đúng")
		f.Errors.Add("err", "err_token_invalid")
		return
	}

	// nếu ko có, hoặc ko parse dc iat, thì xem như expired
	issueAt, err := strconv.ParseInt(iat, 10, 64)

	if err != nil {
		log.Println(err)
		f.Errors.Add("err", "err_token_missing")
		return
	}

	// token expired after 7 days
	isExpired := time.Unix(issueAt+3600*24*7, 0).UTC().Before(time.Now().UTC())
	if isExpired {
		log.Println(time.Unix(issueAt+3600*24*7, 0).UTC())
		f.Errors.Add("err", "err_token_expired")
		return
	}

	// find user by the token
	user, err := s.UserService.FindByEmailToken(r.Context(), token)
	if err != nil {
		log.Println(err)
		f.Errors.Add("err", "err_token_invalid")
	}

	// update user đã verify email
	if err := s.UserService.AddRole(r.Context(), user, "verified_email"); err != nil {
		log.Println(err)
		f.Errors.Add("err", "err_could_not_verified_email")
	}
}

func (s *Server) createComment(w http.ResponseWriter, r *http.Request) {
	userId := s.session.GetInt(r, "user")
	slug := flow.Param(r.Context(), "slug")

	f := form.New(nil)

	if r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			handleError(w, r, errors.New("err parse form"))
			return
		}

		f.Values = r.PostForm
		f.Required("Body", "ParentId")

		if !f.Valid() {
			handleError(w, r, errors.New("err invalid form"))
			return
		}

		user, err := s.UserService.FindByID(r.Context(), userId)
		if err != nil {
			handleError(w, r, err)
			return
		}

		// user can not comment if blocked or not verified email
		if user.IsBlocked {
			handleError(w, r, errors.New("user is blocked"))
			return
		}

		if !helper.Contains("verified_email", user.Roles) {
			handleError(w, r, errors.New("user not verified email"))
			return
		}

		comment := &models.Comment{
			AuthorID: userId,
			ParentID: f.GetInt("ParentId"),
			Slug:     slug,
			Body:     f.Get("Body"),
		}

		if err := s.CommentService.Create(r.Context(), comment); err != nil {
			handleError(w, r, err)
			return
		}

		w.Write([]byte("ok"))
	}
}

// admin
func (s *Server) adminHome(w http.ResponseWriter, r *http.Request) {
	s.adminRender(w, r, "home.html", &templateData{})
}

func (s *Server) adminPosts(w http.ResponseWriter, r *http.Request) {
	posts, total, err := s.PostService.FindPosts(r.Context(), models.PostFilter{})
	if err != nil {
		log.Println(err)
	}

	p := pagination.New(r.URL).SetTotal(total).Generate()
	left, right := p.GetDataBound()

	s.adminRender(w, r, "posts.html", &templateData{
		Posts:      posts[left:right],
		Pagination: p,
	})
}

func (s *Server) adminCreatePost(w http.ResponseWriter, r *http.Request) {
	f := form.New(nil)
	ok := false

	defer func() {
		if !ok {
			s.adminRender(w, r, "posts.update.html", &templateData{
				Form: f,
			})
		}
	}()

	if r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			log.Println(err)
			f.Errors.Add("err", "err_parse_form")
			return
		}

		f.Values = r.PostForm
		f.Required("Title")

		if !f.Valid() {
			log.Println("form invalid", f.Errors)
			f.Errors.Add("err", "err_invalid_form")
			return
		}

		userId := s.session.GetInt(r, "user")
		user, err := s.UserService.FindByID(r.Context(), userId)
		if err != nil {
			log.Println(err)
			f.Errors.Add("err", err.Error())
			return
		}

		publishedAt, err := helper.ParseTime(f.Get("PublishedAt"))
		if err != nil {
			log.Println(err)
			f.Errors.Add("err", err.Error())
			return
		}

		err = s.PostService.Create(r.Context(), &models.Post{
			Title:          f.Get("Title"),
			Body:           f.Get("Body"),
			Short:          f.Get("Short"),
			Tags:           strings.Split(f.Get("Tags"), ","),
			Poster:         f.Get("Poster"),
			AuthorID:       userId,
			AuthorUserName: user.Username,
			PublishedAt:    publishedAt,
			IsEditorsPick:  f.Get("IsEditorsPick") == "on",
		})
		if err != nil {
			log.Println(err)
			f.Errors.Add("err", err.Error())
			return
		}

		ok = true
		http.Redirect(w, r, "/admin/posts", http.StatusSeeOther)
	}
}

func (s *Server) adminUpdatePost(w http.ResponseWriter, r *http.Request) {
	postIdStr := flow.Param(r.Context(), "id")
	postId, err := strconv.Atoi(postIdStr)
	if err != nil {
		handleError(w, r, err)
		return
	}
	post, err := s.PostService.FindByID(r.Context(), postId)
	if err != nil {
		log.Println(err)
		http.Redirect(w, r, "/admin/posts", http.StatusSeeOther)
		return
	}

	f := form.New(nil)
	f.Set("ID", postIdStr)
	f.Set("Title", post.Title)
	f.Set("Body", post.Body)
	f.Set("Poster", post.Poster)
	f.Set("Short", post.Short)
	f.Set("Tags", strings.Join(post.Tags, ","))
	f.Set("IsEditorsPick", fmt.Sprintf("%t", post.IsEditorsPick))
	loc, err := time.LoadLocation("Asia/Ho_Chi_Minh")
	if err == nil {
		f.Set("PublishedAt", post.PublishedAt.In(loc).Format("2006-01-02T15:04:05"))
	}

	ok := false
	defer func() {
		if !ok {
			s.adminRender(w, r, "posts.update.html", &templateData{
				Form: f,
			})
		}
	}()

	if r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			log.Println(err)
			f.Errors.Add("err", "err_parse_form")
			return
		}

		f.Values = r.PostForm
		f.Required("Title")

		if !f.Valid() {
			log.Println("form invalid", f.Errors)
			return
		}

		publishedAt, err := helper.ParseTime(f.Get("PublishedAt"))
		if err != nil {
			log.Println(err)
			f.Errors.Add("err", err.Error())
			return
		}

		if err := s.PostService.Update(r.Context(), &models.Post{
			ID:            post.ID,
			Title:         f.Get("Title"),
			Body:          f.Get("Body"),
			Short:         f.Get("Short"),
			Tags:          strings.Split(f.Get("Tags"), ","),
			Poster:        f.Get("Poster"),
			PublishedAt:   publishedAt,
			IsEditorsPick: f.Get("IsEditorsPick") == "on",
		}); err != nil {
			log.Println(err)
			f.Errors.Add("err", "could_not_update_post")
			return
		}

		ok = true
		http.Redirect(w, r, "/admin/posts", http.StatusSeeOther)
	}
}

func (s *Server) adminRemovePost(w http.ResponseWriter, r *http.Request) {
	postIdStr := flow.Param(r.Context(), "id")
	postId, err := strconv.Atoi(postIdStr)
	if err != nil {
		handleError(w, r, err)
		return
	}

	slug, err := s.PostService.Delete(r.Context(), postId)
	if err != nil {
		handleError(w, r, err)
		return
	}

	// remove comments
	if err := s.CommentService.DeleteBySlug(r.Context(), slug); err != nil {
		handleError(w, r, err)
		return
	}
	http.Redirect(w, r, "/admin/posts", http.StatusSeeOther)
}

func (s *Server) adminComments(w http.ResponseWriter, r *http.Request) {
	comments, total, err := s.CommentService.FindComments(r.Context(), models.CommentFilter{})
	if err != nil {
		handleError(w, r, err)
		return
	}

	p := pagination.New(r.URL).SetTotal(total).Generate()
	left, right := p.GetDataBound()

	s.adminRender(w, r, "comments.html", &templateData{
		Comments:   comments[left:right],
		Pagination: p,
	})
}

func (s *Server) adminHideComment(w http.ResponseWriter, r *http.Request) {
	commentIdStr := flow.Param(r.Context(), "id")
	commentId, err := strconv.Atoi(commentIdStr)
	if err != nil {
		handleError(w, r, err)
		return
	}

	err = s.CommentService.Hide(r.Context(), commentId)
	if err != nil {
		handleError(w, r, err)
		return
	}
	http.Redirect(w, r, "/admin/comments", http.StatusSeeOther)
}

func (s *Server) adminRemoveComment(w http.ResponseWriter, r *http.Request) {
	commentIdStr := flow.Param(r.Context(), "id")
	commentId, err := strconv.Atoi(commentIdStr)
	if err != nil {
		handleError(w, r, err)
		return
	}

	err = s.CommentService.Delete(r.Context(), commentId)
	if err != nil {
		handleError(w, r, err)
		return
	}
	http.Redirect(w, r, "/admin/comments", http.StatusSeeOther)
}

func (s *Server) adminUsers(w http.ResponseWriter, r *http.Request) {
	users, total, err := s.UserService.FindUsers(r.Context(), models.UserFilter{})
	if err != nil {
		handleError(w, r, err)
	}

	p := pagination.New(r.URL).SetTotal(total).Generate()
	left, right := p.GetDataBound()

	s.adminRender(w, r, "users.html", &templateData{
		Users:      users[left:right],
		Pagination: p,
	})
}

func (s *Server) adminBlockUser(w http.ResponseWriter, r *http.Request) {
	userIdStr := flow.Param(r.Context(), "id")
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		handleError(w, r, err)
		return
	}

	err = s.UserService.Block(r.Context(), userId)
	if err != nil {
		handleError(w, r, err)
		return
	}
	http.Redirect(w, r, "/admin/users", http.StatusSeeOther)
}

func (s *Server) adminRemoveUser(w http.ResponseWriter, r *http.Request) {
	userIdStr := flow.Param(r.Context(), "id")
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		handleError(w, r, err)
		return
	}

	err = s.UserService.Delete(r.Context(), userId)
	if err != nil {
		handleError(w, r, err)
		return
	}

	// remove comments
	if err := s.CommentService.DeleteByUserID(r.Context(), userId); err != nil {
		handleError(w, r, err)
		return
	}
	http.Redirect(w, r, "/admin/users", http.StatusSeeOther)
}
