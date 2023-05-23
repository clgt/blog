package http

import (
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
	"github.com/clgt/blog/internal/form"
	"github.com/clgt/blog/internal/models"
	"github.com/clgt/blog/internal/sql"
	"github.com/golangcollege/sessions"
)

type Server struct {
	sever   *http.Server
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
		sever: &http.Server{
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
	s.router.HandleFunc("/blogs/:slug", s.showPost, "GET")

	fs := http.FileServer(http.Dir(filepath.Join("theme", "basic", "static")))
	s.router.Handle("/static/...", http.StripPrefix("/static", fs))

	return s
}

func (s *Server) Open() (err error) {
	go s.sever.ListenAndServe()
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

		user, err := s.UserService.Create(r.Context(), f)
		if err != nil {
			log.Println(err)
			f.Errors.Add("err", "err_could_not_create_user")
			return
		}

		log.Println(user)

		s.session.Put(r, "user", user.ID)

		// // nếu user có nhập email thì gởi verify email luôn
		// if f.Get("Email") != "" {
		// 	// nhớ email
		// 	user.Email = f.Get("Email")

		// 	if err := a.App.Users.LogSendVerifyEmail(user); err != nil {
		// 		log.Println(err)
		// 	}

		// 	// gởi email verify
		// 	email.PostmarkApiToken = a.App.Config.PostmarkApiToken
		// 	email.Domain = a.App.Config.Domain
		// 	if err := email.SendVerifyEmail(user); err != nil {
		// 		log.Println(err)
		// 	}
		// }

		// log := fmt.Sprintf(
		// 	"%s %s user_id = %d đăng ký thành công.",
		// 	user.FirstName,
		// 	user.LastName,
		// 	user.ID,
		// )
		// a.App.Log.Add(
		// 	fmt.Sprint(user.ID),
		// 	log,
		// )
		// if a.App.Config.TelegramToken != "" && a.App.Config.TelegramChatID != "" {
		// 	a.App.Telegram.Msg(r.Context(), log)
		// }

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

		user, err := s.UserService.Auth(r.Context(), f)
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
	user, err := s.UserService.ID(fmt.Sprint(userId))

	if err != nil {
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

		user, _ := s.UserService.ID(fmt.Sprint(userId))
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

			s.UserService.UpdateNewPassword(r.Context(), fmt.Sprint(user.ID), f.Get("Password"))
		}

		http.Redirect(w, r, "/login", http.StatusSeeOther)
	}
}

func (s *Server) forgotPassword(w http.ResponseWriter, r *http.Request) {
	s.render(w, r, "password.forgot.html", &templateData{})
}
