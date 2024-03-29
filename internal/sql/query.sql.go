// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0
// source: query.sql

package sql

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createUser = `-- name: CreateUser :one
insert into users (username, email)
values ($1, $2)
returning id
`

type CreateUserParams struct {
	Username string
	Email    string
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (int32, error) {
	row := q.db.QueryRow(ctx, createUser, arg.Username, arg.Email)
	var id int32
	err := row.Scan(&id)
	return id, err
}

const getUser = `-- name: GetUser :one
select id, username, email, password, roles, email_token, created_at, updated_at, send_verified_email_at, reset_pwd_token, rpt_expired_at, is_blocked from users where id = $1 limit 1
`

func (q *Queries) GetUser(ctx context.Context, id int32) (User, error) {
	row := q.db.QueryRow(ctx, getUser, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.Password,
		&i.Roles,
		&i.EmailToken,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.SendVerifiedEmailAt,
		&i.ResetPwdToken,
		&i.RptExpiredAt,
		&i.IsBlocked,
	)
	return i, err
}

const listUser = `-- name: ListUser :many
SELECT
	id, username, email, password, roles, email_token, created_at, updated_at, send_verified_email_at, reset_pwd_token, rpt_expired_at, is_blocked,
	count(*) OVER () AS total
FROM
	users
limit case when $2::int > 0 then $2::int else null end
offset $1::int
`

type ListUserParams struct {
	Skip int32
	Max  int32
}

type ListUserRow struct {
	ID                  int32
	Username            string
	Email               string
	Password            string
	Roles               []string
	EmailToken          string
	CreatedAt           pgtype.Timestamptz
	UpdatedAt           pgtype.Timestamptz
	SendVerifiedEmailAt pgtype.Timestamptz
	ResetPwdToken       string
	RptExpiredAt        pgtype.Timestamptz
	IsBlocked           bool
	Total               int64
}

func (q *Queries) ListUser(ctx context.Context, arg ListUserParams) ([]ListUserRow, error) {
	rows, err := q.db.Query(ctx, listUser, arg.Skip, arg.Max)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListUserRow
	for rows.Next() {
		var i ListUserRow
		if err := rows.Scan(
			&i.ID,
			&i.Username,
			&i.Email,
			&i.Password,
			&i.Roles,
			&i.EmailToken,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.SendVerifiedEmailAt,
			&i.ResetPwdToken,
			&i.RptExpiredAt,
			&i.IsBlocked,
			&i.Total,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateUser = `-- name: UpdateUser :one
update users
set
    email = case when $1::bool then $2 else email end,
    username = case when $3::bool then $4 else username end
where
    id = $5
returning id, username, email, password, roles, email_token, created_at, updated_at, send_verified_email_at, reset_pwd_token, rpt_expired_at, is_blocked
`

type UpdateUserParams struct {
	EmailDoUpdate    bool
	Email            string
	UsernameDoUpdate bool
	Username         string
	ID               int32
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, updateUser,
		arg.EmailDoUpdate,
		arg.Email,
		arg.UsernameDoUpdate,
		arg.Username,
		arg.ID,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.Password,
		&i.Roles,
		&i.EmailToken,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.SendVerifiedEmailAt,
		&i.ResetPwdToken,
		&i.RptExpiredAt,
		&i.IsBlocked,
	)
	return i, err
}
