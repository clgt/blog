package models

import (
	"errors"
	"strings"
	"time"
)

type Comment struct {
	ID            int
	UserID        int
	User          User
	ParentID      int
	ChildComments []*Comment
	Slug          string
	Message       string
	CreatedAt     time.Time
	UpdatedAt     time.Time
	IsHidden      bool

	Total int64
}

func (c *Comment) Validate() error {
	// santinize and validate in the same place
	c.Message = strings.TrimSpace(c.Message)
	if c.Message == "" {
		return errors.New("message is empty")
	}

	return nil
}

type CommentFilter struct {
	ID        int
	Slug      string
	IsVisible bool

	Limit  int
	Offset int
}
