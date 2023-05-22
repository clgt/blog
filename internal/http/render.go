package http

import (
	"bytes"
	"html/template"
	"net/http"
	"path/filepath"
)

type templateData struct {
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

	buf := new(bytes.Buffer)
	if err := ts.Execute(buf, td); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	buf.WriteTo(w)
}
