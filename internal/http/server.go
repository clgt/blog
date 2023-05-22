package http

import (
	"errors"
	"fmt"
	"net/http"
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
	}

	s.router.HandleFunc("/", s.home, "GET")
	s.router.HandleFunc("/blogs/:slug", s.showPost, "GET")

	return s
}

func (s *Server) Open() error {
	go s.sever.ListenAndServe()
	return nil
}

func (s *Server) Close() error {
	return nil
}

func (s *Server) home(w http.ResponseWriter, r *http.Request) {
	filter := models.PostFilter{
		// ID: 19,
	}
	posts, _, err := s.PostService.FindPosts(r.Context(), filter)
	if err != nil {
		handleError(w, r, err)
		return
	}
	for _, p := range posts {
		fmt.Fprintf(w, "%s\n", p.Title)
	}
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
