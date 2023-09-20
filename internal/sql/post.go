package sql

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/clgt/blog/internal/models"
	"github.com/lib/pq"
)

var (
	ErrPostNotFound = errors.New("post not found")
)

type PostService struct {
	db *DB
}

var postColumes = []string{
	"id",
	"title",
	"slug",
	"poster",
	"tags",
	"short",
	"body",
	"author_id",
	"published_at",
	"created_at",
	"updated_at",
	"author_username",
	"is_editors_pick",
}

func NewPostService(db *DB) *PostService {
	return &PostService{db: db}
}

func scanPost(r Scanner, u *models.Post) error {
	if err := r.Scan(
		&u.ID,
		&u.Title,
		&u.Slug,
		&u.Poster,
		pq.Array(&u.Tags),
		&u.Short,
		&u.Body,
		&u.AuthorID,
		&u.PublishedAt,
		&u.CreatedAt,
		&u.UpdatedAt,
		&u.AuthorUserName,
		&u.IsEditorsPick,
		&u.Total,
	); err != nil {
		return err
	}

	return nil
}

func (s *PostService) FindPosts(ctx context.Context, filter models.PostFilter) ([]*models.Post, int, error) {
	q := fmt.Sprintf(`
		select
			%s, count(*) over() as total
		from
			posts
		where
			case
				when $1 > 0 then id=$1
				else true
			end
		and
			case
				when $2 <> '' then slug=$2
				else true
			end
		and
			case
				when $3 then published_at <= now()
				else true
			end
		and
			case
				when $4 = true then is_editors_pick = true
				else true
			end
		order by
			case
				when $5 then published_at
				else created_at
			end desc
		limit
			case
				when $6 > 0 then $6
				else null
			end
		offset $7
	`, strings.Join(postColumes, ", "))

	rows, err := s.db.Conn.Query(ctx, q, filter.ID, filter.Slug, filter.IsPublished, filter.IsEditorsPick, filter.InPublicationOrder, filter.Limit, filter.Offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	posts := make([]*models.Post, 0)
	for rows.Next() {
		p := new(models.Post)
		if err := scanPost(rows, p); err != nil {
			return nil, 0, err
		}
		posts = append(posts, p)
	}

	return posts, len(posts), err
}

func (s *PostService) FindByID(ctx context.Context, id int) (*models.Post, error) {
	posts, _, err := s.FindPosts(ctx, models.PostFilter{
		ID:    id,
		Limit: 1,
	})
	if err != nil {
		return nil, err
	} else if len(posts) == 0 {
		return nil, ErrPostNotFound
	}

	return posts[0], nil
}

func (s *PostService) FindBySlug(ctx context.Context, slug string) (*models.Post, error) {
	posts, _, err := s.FindPosts(ctx, models.PostFilter{
		Slug:  slug,
		Limit: 1,
	})
	if err != nil {
		return nil, err
	} else if len(posts) == 0 {
		return nil, ErrPostNotFound
	}

	return posts[0], nil
}

func (s *PostService) Create(ctx context.Context, post *models.Post) error {
	const q = `
	insert into posts (title, slug, poster, tags, short, body, author_id, published_at, author_username, is_editors_pick)
		values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	returning
		id;
	`

	if err := post.Validate(); err != nil {
		return err
	}

	row := s.db.Conn.QueryRow(ctx, q,
		post.Title,
		post.Slug,
		post.Poster,
		pq.Array(post.Tags),
		post.Short,
		post.Body,
		post.AuthorID,
		post.PublishedAt,
		post.AuthorUserName,
		post.IsEditorsPick,
	)

	if err := row.Scan(&post.ID); err != nil {
		return err
	}

	return nil
}

func (s *PostService) Update(ctx context.Context, post *models.Post) error {
	// coalesce will return first non null/nil value
	const q = `
	update posts set
		title = coalesce($2, title),
		slug = coalesce($3, slug),
		poster = coalesce($4, poster),
		tags = coalesce($5, tags),
		short = coalesce($6, short),
		body = coalesce($7, body),
		published_at = coalesce($8, published_at),
		is_editors_pick = coalesce($9, is_editors_pick),
		updated_at = now()
	where
		id = $1
	`

	if err := post.Validate(); err != nil {
		return err
	}

	_, err := s.db.Conn.Exec(ctx, q, post.ID, post.Title, post.Slug, post.Poster, pq.Array(post.Tags), post.Short, post.Body, post.PublishedAt, post.IsEditorsPick)
	return err
}

func (s *PostService) Delete(ctx context.Context, id int) (string, error) {
	const q = `
		delete from posts where id = $1 returnning slug;
	`
	row := s.db.Conn.QueryRow(ctx, q, id)

	// get slug of deleted post to delete its comments
	var slug string
	if err := row.Scan(&slug); err != nil {
		return "", err
	}

	return slug, nil
}
