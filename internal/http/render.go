package http

import (
	"bytes"
	"context"
	"html/template"
	"log"
	"net/http"
	"path/filepath"
	"time"

	"github.com/clgt/blog/internal/form"
	"github.com/clgt/blog/internal/models"
	"github.com/dustin/go-humanize"
	mathjax "github.com/litao91/goldmark-mathjax"
	"github.com/yuin/goldmark"
	emoji "github.com/yuin/goldmark-emoji"
	highlighting "github.com/yuin/goldmark-highlighting/v2"
	meta "github.com/yuin/goldmark-meta"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
)

type templateData struct {
	Form        *form.Form
	User        *models.User
	Users       []*models.User
	Post        *models.Post
	Posts       []*models.Post
	LatestPosts []*models.Post
	EditorsPick []*models.Post
	Comments    []*models.Comment
}

var functions = template.FuncMap{
	"has_role":         hasRole,
	"humanize_time":    humanizeTime,
	"get_latest_posts": getLatestPosts,
	"get_more_posts":   getMorePosts,
	"get_editors_pick": getEditorsPick,
	"markdown":         markdownConvert,
	"find_post":        findPostBySlug,
}

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
		u, err := s.UserService.FindByID(r.Context(), id)
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

func (s *Server) adminRender(w http.ResponseWriter, r *http.Request, name string, td *templateData) {
	ts, ok := s.adminHtml[name]
	if !ok {
		http.Error(w, "missing template:"+name, 500)
		return
	}
	id := s.session.GetInt(r, "user")
	if id > 0 {
		// Get user by id
		u, err := s.UserService.FindByID(r.Context(), id)
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

func hasRole(roles []string, role string) bool {
	for _, s := range roles {
		if s == role {
			return true
		}
	}
	return false
}

func humanizeTime(v *time.Time) string {
	if v == nil {
		return ""
	}
	return humanize.Time(*v)
}

func getLatestPosts(n int) []*models.Post {
	latestPosts, _, err := server.PostService.FindPosts(context.Background(), models.PostFilter{
		IsPublished:        true,
		InPublicationOrder: true,
		Limit:              n,
	})

	if err != nil {
		log.Println(err)
	}

	return latestPosts
}

func getMorePosts(n int) []*models.Post {
	posts, _, err := server.PostService.FindPosts(context.Background(), models.PostFilter{
		IsPublished:        true,
		InPublicationOrder: true,
		Limit:              6,
		Offset:             n,
	})

	if err != nil {
		log.Println(err)
	}

	return posts
}

func getEditorsPick(n int) []*models.Post {
	editorsPick, _, err := server.PostService.FindPosts(context.Background(), models.PostFilter{
		IsPublished:        true,
		InPublicationOrder: true,
		IsEditorsPick:      true,
		Limit:              n,
	})

	if err != nil {
		log.Println(err)
	}

	return editorsPick
}

func markdownConvert(content string) template.HTML {
	md := goldmark.New(
		goldmark.WithExtensions(
			extension.GFM,
			highlighting.Highlighting,
			emoji.Emoji,
			mathjax.MathJax,
			meta.Meta,
		),
		goldmark.WithParserOptions(
			parser.WithAutoHeadingID(),
		),
		goldmark.WithRendererOptions(
			html.WithHardWraps(),
		),
	)
	var buf bytes.Buffer
	if err := md.Convert([]byte(content), &buf); err != nil {
		panic(err)
	}
	return template.HTML(buf.String())
}

func findPostBySlug(slug string) *models.Post {
	post, err := server.PostService.FindBySlug(context.Background(), slug)
	if err != nil {
		log.Println(err)
	}
	return post
}
