package models

import (
	"errors"
	"strings"
	"time"
)

type Comment struct {
	ID            int
	AuthorID      int
	User          User
	ParentID      int
	ChildComments []*Comment
	Slug          string
	Body          string
	CreatedAt     time.Time
	UpdatedAt     time.Time
	IsHidden      bool

	Total int64
}

func (c *Comment) Validate() error {
	// santinize and validate in the same place
	c.Body = strings.TrimSpace(c.Body)
	if c.Body == "" {
		return errors.New("body is empty")
	}

	return nil
}

type CommentFilter struct {
	ID        int
	Slug      string
	AuthorID  int
	IsVisible bool

	Limit  int
	Offset int
}
