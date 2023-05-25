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
	"github.com/clgt/blog/internal/models"
	"github.com/clgt/blog/internal/sql"
	"github.com/golangcollege/sessions"
)

type Server struct {
	server  *http.Server
	router  *flow.Mux
	html    map[string]*template.Template
	session *sessions.Session

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

	s.router.HandleFunc("/", s.showHome, "GET")
	s.router.HandleFunc("/register", s.register, "GET")
	s.router.HandleFunc("/register", s.register, "POST")
	s.router.HandleFunc("/login", s.login, "GET")
	s.router.HandleFunc("/login", s.login, "POST")
	s.router.HandleFunc("/logout", s.logout, "GET")
	s.router.HandleFunc("/profile", s.profile, "GET")
	s.router.HandleFunc("/change-password", s.changePassword, "GET")
	s.router.HandleFunc("/change-password", s.changePassword, "POST")
	s.router.HandleFunc("/forgot-password", s.forgotPassword, "GET")
	s.router.HandleFunc("/verify-email", s.verifyEmailResult, "GET")
	s.router.HandleFunc("/blogs/:slug", s.showPost, "GET")

	fs := http.FileServer(http.Dir(filepath.Join("theme", "basic", "static")))
	s.router.Handle("/static/...", http.StripPrefix("/static", fs))

	return s
}

func (s *Server) Open() (err error) {
	go s.server.ListenAndServe()
	if s.html, err = parseTheme("basic"); err != nil {
		return
	}
	return
}

func (s *Server) Close() (err error) {
	return
}

func (s *Server) showPost(w http.ResponseWriter, r *http.Request) {
	slug := flow.Param(r.Context(), "slug")
	id := strings.Split(slug, "-")[0]
	if id == "" {
		handleError(w, r, errors.New("id invalid"))
		return
	}

	idNum, err := strconv.Atoi(id)
	if err != nil {
		handleError(w, r, err)
		return
	}

	filter := models.PostFilter{
		ID: idNum,
	}

	posts, _, err := s.PostService.FindPosts(r.Context(), filter)
	if err != nil {
		handleError(w, r, err)
		return
	}
	for _, p := range posts {
		fmt.Fprint(w, p)
	}
}

func (s *Server) showHome(w http.ResponseWriter, r *http.Request) {
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

		log.Println("email", f.Get("Email"))

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

	userId := s.session.GetInt(r, "user")

	if userId <= 0 {
		ok = true
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	defer func() {
		if !ok {
			s.render(w, r, "password.change.html", &templateData{
				Form: f,
			})
		}
	}()

	if r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			f.Errors.Add("err", "err_parse_form")
			return
		}

		f.Values = r.PostForm
		f.Required("OldPassword", "Password", "PasswordConfirmation")

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
		if user != nil {
			err := s.UserService.CompareHashAndPassword(user.Password, f.Get("OldPassword"))
			if err != nil {
				log.Println("Old password invalid", f.Get("OldPassword"))
				f.Errors.Add("err", "err_invalid_old_password")
				return
			}

			err = s.UserService.CompareHashAndPassword(user.Password, f.Get("Password"))
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

		http.Redirect(w, r, "/login", http.StatusSeeOther)
	}
}

func (s *Server) forgotPassword(w http.ResponseWriter, r *http.Request) {
	s.render(w, r, "password.forgot.html", &templateData{})
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

	// tìm user với cái token này
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
