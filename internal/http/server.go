package http

import (
	"errors"
	"fmt"
	"html/template"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/alexedwards/flow"
	"github.com/clgt/blog/internal/config"
	"github.com/clgt/blog/internal/models"
	"github.com/clgt/blog/internal/sql"
)

type Server struct {
	sever  *http.Server
	router *flow.Mux
	html   map[string]*template.Template

	// services
	PostService *sql.PostService
}

func NewServer(cfg *config.Config) *Server {
	mux := flow.New()

	s := &Server{
		sever: &http.Server{
			Addr:         cfg.ListenAddress,
			ReadTimeout:  15 * time.Second,
			WriteTimeout: 30 * time.Second,
			IdleTimeout:  150 * time.Second,
			Handler:      mux,
		},
		router: mux,
		html:   make(map[string]*template.Template),
	}

	s.router.HandleFunc("/", s.showHome, "GET")
	s.router.HandleFunc("/register", s.userRegister, "GET")
	s.router.HandleFunc("/login", s.userLogin, "GET")
	s.router.HandleFunc("/change-password", s.userChangePassword, "GET")
	s.router.HandleFunc("/forgot-password", s.userForgotPassword, "GET")
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
	s.render(w, r, "home.html", nil)
}

func (s *Server) userRegister(w http.ResponseWriter, r *http.Request) {
	s.render(w, r, "register.html", nil)
}

func (s *Server) userLogin(w http.ResponseWriter, r *http.Request) {
	s.render(w, r, "login.html", nil)
}

func (s *Server) userChangePassword(w http.ResponseWriter, r *http.Request) {
	s.render(w, r, "password.change.html", nil)
}

func (s *Server) userForgotPassword(w http.ResponseWriter, r *http.Request) {
	s.render(w, r, "password.forgot.html", nil)
}
