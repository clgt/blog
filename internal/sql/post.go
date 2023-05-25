package sql

import (
	"context"
	"errors"

	"github.com/clgt/blog/internal/models"
	"github.com/lib/pq"
)

var (
	ErrPostNotFound = errors.New("post not found")
)

type PostService struct {
	db *DB
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
		&u.PublisherID,
		&u.PublishedAt,
		&u.CreatedAt,
		&u.UpdatedAt,
		&u.Total,
	); err != nil {
		return err
	}

	return nil
}

func (s *PostService) FindPosts(ctx context.Context, filter models.PostFilter) ([]*models.Post, int, error) {
	q := `
		select
			id, title, slug, poster, tags, short, body, publisher_id, published_at, created_at, updated_at, count(*) over() as total
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
		order by created_at desc
		limit
			case
				when $3 > 0 then $3
				else null
			end
		offset $4
	`

	rows, err := s.db.conn.QueryContext(ctx, q, filter.ID, filter.Slug, filter.Limit, filter.Offset)
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

func (s *PostService) FindPostByID(ctx context.Context, id int) (*models.Post, error) {
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

func (s *PostService) CreatePost(ctx context.Context, post *models.Post) error {
	const q = `
	insert into posts (title, slug, poster, tags, short, body)
		values($1, $2, $3, $4, $5, $6)
	returning
		id;
	`

	if err := post.Validate(); err != nil {
		return err
	}

	row := s.db.conn.QueryRowContext(ctx, q,
		post.Title,
		post.Slug,
		post.Poster,
		pq.Array(post.Tags),
		post.Short,
		post.Body,
	)

	if err := row.Scan(&post.ID); err != nil {
		return err
	}

	return nil
}

func (s *PostService) UpdatePost(ctx context.Context, param *models.PostUpdateParam) error {
	// coalesce will return first non null/nil value
	const q = `
	update posts set
		title = coalesce($2, title),
		slug = coalesce($3, slug)
	where
		id = $1
	`
	_, err := s.db.conn.Exec(q)
	return err
}
