package http

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"path/filepath"

	"github.com/clgt/blog/internal/form"
	"github.com/clgt/blog/internal/models"
)

type templateData struct {
	Form *form.Form
	User *models.User
}

var functions = template.FuncMap{}

func parseTheme(theme string) (map[string]*template.Template, error) {
	pages, err := filepath.Glob(filepath.Join("theme", theme, "*.html"))
	if err != nil {
		return nil, err
	}
	cache := map[string]*template.Template{}

	for _, page := range pages {
		name := filepath.Base(page)

		ts := template.New(name).Funcs(functions)

		ts, err = ts.ParseGlob(filepath.Join("theme", theme, "include", "*.html"))
		if err != nil {
			return nil, err
		}

		ts, err = ts.ParseFiles(page)
		if err != nil {
			return nil, err
		}

		cache[name] = ts
	}
	return cache, nil
}

func (s *Server) render(w http.ResponseWriter, r *http.Request, name string, td *templateData) {
	ts, ok := s.html[name]
	if !ok {
		http.Error(w, "missing template:"+name, 500)
		return
	}
	id := s.session.GetInt(r, "user")
	if id > 0 {
		// Get user by id
		u, err := s.UserService.ID(fmt.Sprint(id))
		if err != nil {
			log.Println(err)
			// user has been deleted? remove session anyway
			s.session.Remove(r, "user")
		} else {
			td.User = u
		}
	}

	buf := new(bytes.Buffer)
	if err := ts.Execute(buf, td); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	buf.WriteTo(w)
}
