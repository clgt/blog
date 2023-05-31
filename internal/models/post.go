package models

import (
	"errors"
	"strings"
	"time"

	"github.com/mozillazg/go-slugify"
)

type Post struct {
	ID             int
	Title          string
	Slug           string
	Poster         string
	Tags           []string
	Short          string
	Body           string
	AuthorID       int
	AuthorUserName string
	PublishedAt    *time.Time
	CreatedAt      time.Time
	UpdatedAt      time.Time
	IsEditorsPick  bool

	Total int64
}

func (p *Post) Validate() error {
	// santinize and validate in the same place
	p.Title = strings.TrimSpace(p.Title)
	if p.Title == "" {
		return errors.New("title is empty")
	}

	p.Slug = slugify.Slugify(strings.ReplaceAll(p.Title, "&", "and"))
	if p.Slug == "" {
		return errors.New("slug is empty")
	}
	p.Short = strings.TrimSpace(p.Short)
	if p.Short == "" {
		return errors.New("short is empty")
	}

	p.Body = strings.TrimSpace(p.Body)
	if p.Body == "" {
		return errors.New("body is empty")
	}

	return nil
}

type PostFilter struct {
	ID                 int
	Slug               string
	IsPublished        bool
	InPublicationOrder bool
	IsEditorsPick      bool

	Limit  int
	Offset int
}

type PostUpdateParam struct {
	ID    int
	Title *string
	Slug  *string
}
