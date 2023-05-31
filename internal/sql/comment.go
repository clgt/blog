package sql

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/clgt/blog/internal/models"
)

var (
	ErrCommentNotFound = errors.New("comment not found")
)

type CommentService struct {
	db *DB
}

var commentColumes = []string{
	"comments.id",
	"comments.parent_id",
	"comments.slug",
	"comments.message",
	"comments.created_at",
	"comments.updated_at",
	"comments.is_hidden",
	"comments.user_id",
	"users.first_name",
	"users.last_name",
}

func NewCommentService(db *DB) *CommentService {
	return &CommentService{db: db}
}

func scanComment(r Scanner, u *models.Comment) error {
	if err := r.Scan(
		&u.ID,
		&u.ParentID,
		&u.Slug,
		&u.Message,
		&u.CreatedAt,
		&u.UpdatedAt,
		&u.IsHidden,
		&u.User.ID,
		&u.User.FirstName,
		&u.User.LastName,
		&u.Total,
	); err != nil {
		return err
	}

	return nil
}

func BuildCommentTree(comments []*models.Comment) []*models.Comment {
	commentMap := make(map[int]*models.Comment)

	// Create a mapping of comment IDs to comments for efficient lookup
	for _, comment := range comments {
		commentMap[comment.ID] = comment
	}

	var rootComments []*models.Comment

	// Iterate through the comments to build the tree
	for _, comment := range comments {
		parentID := comment.ParentID
		if parentID == 0 {
			// Comment is a root comment
			rootComments = append(rootComments, comment)
		} else {
			// Comment has a parent, so add it as a child to the parent comment
			parentComment := commentMap[parentID]
			if parentComment != nil {
				parentComment.ChildComments = append(parentComment.ChildComments, comment)
			}
		}
	}

	return rootComments
}

func (s *CommentService) FindComments(ctx context.Context, filter models.CommentFilter) ([]*models.Comment, int, error) {
	q := fmt.Sprintf(`
		select
			%s, count(*) over() as total
		from
			comments left join users on
			comments.user_id = users.id
		where
			case
				when $1 > 0 then comments.id=$1
				else true
			end
		and
			case
				when $2 <> '' then comments.slug=$2
				else true
			end
		and
			case
				when $3 then comments.is_hidden=false
				else true
			end
		order by created_at desc
		limit
			case
				when $4 > 0 then $4
				else null
			end
		offset $5
	`, strings.Join(commentColumes, ", "))

	rows, err := s.db.conn.QueryContext(ctx, q, filter.ID, filter.Slug, filter.IsVisible, filter.Limit, filter.Offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	comments := make([]*models.Comment, 0)
	for rows.Next() {
		p := new(models.Comment)
		if err := scanComment(rows, p); err != nil {
			return nil, 0, err
		}
		comments = append(comments, p)
	}

	return comments, len(comments), err
}

func (s *CommentService) FindByID(ctx context.Context, id int) (*models.Comment, error) {
	comments, _, err := s.FindComments(ctx, models.CommentFilter{
		ID:    id,
		Limit: 1,
	})
	if err != nil {
		return nil, err
	} else if len(comments) == 0 {
		return nil, ErrCommentNotFound
	}

	return comments[0], nil
}

func (s *CommentService) FindBySlug(ctx context.Context, slug string) ([]*models.Comment, error) {
	comments, _, err := s.FindComments(ctx, models.CommentFilter{
		Slug:      slug,
		IsVisible: true,
	})

	if err != nil {
		return nil, err
	}

	return BuildCommentTree(comments), nil
}

func (s *CommentService) Create(ctx context.Context, comment *models.Comment) error {
	const q = `
	insert into comments (user_id, parent_id, slug, message)
		values($1, $2, $3, $4)
	returning
		id;
	`

	if err := comment.Validate(); err != nil {
		return err
	}

	row := s.db.conn.QueryRowContext(ctx, q,
		comment.UserID,
		comment.ParentID,
		comment.Slug,
		comment.Message,
	)

	if err := row.Scan(&comment.ID); err != nil {
		return err
	}

	return nil
}

func (s *CommentService) Hide(ctx context.Context, id int) error {
	const q = `
		update comments
		set
			is_hidden = not(coalesce(is_hidden, false)),
			updated_at = now()
		where id = $1 or parent_id = $1
	`
	_, err := s.db.conn.ExecContext(ctx, q, id)
	return err
}

func (s *CommentService) Delete(ctx context.Context, id int) error {
	const q = `
		delete from comments where id = $1 or parent_id = $1
	`
	_, err := s.db.conn.ExecContext(ctx, q, id)
	return err
}

func (s *CommentService) DeleteBySlug(ctx context.Context, slug string) error {
	const q = `
		delete from comments where slug = $1
	`
	_, err := s.db.conn.ExecContext(ctx, q, slug)
	return err
}

func (s *CommentService) DeleteByUserID(ctx context.Context, userId int) error {
	const q = `
		delete from comments where user_id = $1 returning id
	`
	rows, err := s.db.conn.QueryContext(ctx, q, userId)
	if err != nil {
		return err
	}
	defer rows.Close()

	// delete child comments
	for rows.Next() {
		var id int
		if err := rows.Scan(&id); err != nil {
			return err
		}
		if err := s.Delete(ctx, id); err != nil {
			return err
		}
	}

	return nil
}
