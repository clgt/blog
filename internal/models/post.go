package models

import (
	"errors"
	"strings"
	"time"
)

type Post struct {
	ID          int
	Title       string
	Slug        string
	Poster      string
	Tags        []string
	Short       string
	Body        string
	PublishedAt *time.Time
	CreatedAt   time.Time
	UpdatedAt   time.Time

	Total int64
}

func (p *Post) Validate() error {
	// santinize and validate in the same place
	p.Title = strings.TrimSpace(p.Title)
	if p.Title == "" {
		return errors.New("title invalid")
	}

	return nil
}

type PostFilter struct {
	ID   int
	Slug string

	Limit  int
	Offset int
}
