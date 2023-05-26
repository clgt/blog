package http

import (
	"crypto/md5"
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
	"github.com/clgt/blog/internal/models"
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
	PostService *sql.PostService
	UserService *sql.UserService
}

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
	s.router.HandleFunc("/register", s.register, "GET")
	s.router.HandleFunc("/register", s.register, "POST")
	s.router.HandleFunc("/login", s.login, "GET")
	s.router.HandleFunc("/login", s.login, "POST")
	s.router.HandleFunc("/logout", s.logout, "GET")
	s.router.HandleFunc("/profile", s.profile, "GET")
	s.router.HandleFunc("/change-password", s.changePassword, "GET")
	s.router.HandleFunc("/change-password", s.changePassword, "POST")
	s.router.HandleFunc("/forgot-password", s.forgotPassword, "GET")
	s.router.HandleFunc("/forgot-password", s.forgotPassword, "POST")
	s.router.HandleFunc("/verify-email", s.verifyEmailResult, "GET")
	s.router.HandleFunc("/blogs", s.posts, "GET")
	s.router.HandleFunc("/blogs/:slug", s.postDetails, "GET")

	// admin routes
	s.router.HandleFunc("/admin", use(s.adminHome, s.isadmin), "GET")
	s.router.HandleFunc("/admin/posts", use(s.adminPosts, s.isadmin), "GET")
	s.router.HandleFunc("/admin/posts/new", use(s.adminCreatePost, s.isadmin), "GET")
	s.router.HandleFunc("/admin/posts/new", use(s.adminCreatePost, s.isadmin), "POST")
	s.router.HandleFunc("/admin/users", use(s.adminUsers, s.isadmin), "GET")

	// static files
	fs := http.FileServer(http.Dir(filepath.Join("theme", "basic", "static")))
	s.router.Handle("/static/...", http.StripPrefix("/static", fs))

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
	posts, total, err := s.PostService.FindPosts(r.Context(), models.PostFilter{})
	if err != nil {
		log.Println(err)
	}

	log.Println("total", total)

	s.render(w, r, "posts.html", &templateData{
		Posts: posts,
	})
}

func (s *Server) postDetails(w http.ResponseWriter, r *http.Request) {
	slug := flow.Param(r.Context(), "slug")

	post, err := s.PostService.FindBySlug(r.Context(), slug)
	if err != nil {
		handleError(w, r, err)
		return
	}
	s.render(w, r, "posts.details.html", &templateData{
		Post: post,
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
		f.Required("Username", "Password", "PasswordConfirmation", "Email", "FirstName", "LastName")

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
			Username:  f.Get("Username"),
			Password:  f.Get("Password"),
			Email:     f.Get("Email"),
			FirstName: f.Get("FirstName"),
			LastName:  f.Get("LastName"),
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
		http.Redirect(w, r, "/", http.StatusSeeOther)
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
		http.Redirect(w, r, "/", http.StatusSeeOther)
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

	// token của email sẽ expired sau 1 tuần
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

// admin
func (s *Server) adminHome(w http.ResponseWriter, r *http.Request) {
	s.adminRender(w, r, "home.html", &templateData{})
}

func (s *Server) adminPosts(w http.ResponseWriter, r *http.Request) {
	posts, total, err := s.PostService.FindPosts(r.Context(), models.PostFilter{})
	if err != nil {
		log.Println(err)
	}

	log.Println("total", total)

	s.adminRender(w, r, "posts.html", &templateData{
		Posts: posts,
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

		err := s.PostService.CreatePost(r.Context(), &models.Post{
			Title:       f.Get("Title"),
			Body:        f.Get("Body"),
			Short:       f.Get("Short"),
			Tags:        strings.Split(f.Get("Tags"), ","),
			PublisherID: userId,
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

func (s *Server) adminUsers(w http.ResponseWriter, r *http.Request) {
	s.adminRender(w, r, "home.html", &templateData{})
}
