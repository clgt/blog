package sql

import (
	"context"
	"errors"

	"github.com/clgt/blog/internal/helper"
	"github.com/clgt/blog/internal/models"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrUserNotFound = errors.New("user not found")
)

type UserService struct {
	db *DB
}

func NewUserService(db *DB) *UserService {
	return &UserService{db: db}
}

func (s *UserService) HashPassword(str string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(str), 12)
	return string(hashedPassword), err
}

func (s *UserService) CompareHashAndPassword(hashed string, password string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
	return err
}

func scanUser(r Scanner, u *models.User) error {
	if err := r.Scan(
		&u.ID,
		&u.Username,
		&u.Email,
		&u.Password,
		&u.FirstName,
		&u.LastName,
		pq.Array(&u.Roles),
		&u.EmailToken,
		&u.CreatedAt,
		&u.UpdatedAt,
		&u.SendVerifiedEmailAt,
		&u.ResetPasswordToken,
		&u.RPTExpiredAt,
		&u.Total,
	); err != nil {
		return err
	}

	return nil
}

func (s *UserService) FindUsers(ctx context.Context, filter models.UserFilter) ([]*models.User, int, error) {
	var total int
	q := `
		select
			id, username, email, password, first_name, last_name, roles, email_token, created_at, updated_at, send_verified_email_at, reset_pwd_token, rpt_expired_at, count(*) over() as total
		from
			users
		where
			case
				when $1 > 0 then id=$1
				else true
			end
		and
			case
				when $2 <> '' then username=$2
				else true
			end
		and
			case
				when $3 <> '' then email=$3
				else true
			end
		and
			case
				when $4 <> '' then email_token=$4
				else true
			end
		order by created_at desc
		limit
			case
				when $5 > 0 then $5
				else null
			end
		offset $6
	`

	rows, err := s.db.conn.QueryContext(ctx, q, filter.ID, filter.Username, filter.Email, filter.EmailToken, filter.Limit, filter.Offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	users := make([]*models.User, 0)
	for rows.Next() {
		u := new(models.User)
		if err := scanUser(rows, u); err != nil {
			return nil, 0, err
		}
		users = append(users, u)
	}

	return users, total, err
}

func (s *UserService) FindByID(ctx context.Context, id int) (*models.User, error) {
	users, _, err := s.FindUsers(ctx, models.UserFilter{
		ID:    id,
		Limit: 1,
	})

	if err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, ErrUserNotFound
	}
	return users[0], nil
}

func (s *UserService) Auth(ctx context.Context, user *models.User) (*models.User, error) {
	users, _, err := s.FindUsers(ctx, models.UserFilter{
		Username: user.Username,
		Limit:    1,
	})

	if err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, ErrUserNotFound
	}

	hashed := users[0].Password
	if err := s.CompareHashAndPassword(hashed, user.Password); err != nil {
		return nil, err
	}

	return &models.User{ID: users[0].ID}, nil
}

func (s *UserService) Create(ctx context.Context, user *models.User) (*models.User, error) {
	q := `
		insert into users (username, first_name, last_name, email, password)
		values ($1, $2, $3, $4, $5)
		returning id, email
	`
	hashedPassword, err := s.HashPassword(user.Password)
	if err != nil {
		return nil, err
	}

	row := s.db.conn.QueryRowContext(ctx, q,
		user.Username,
		user.FirstName,
		user.LastName,
		user.Email,
		hashedPassword,
	)
	u := new(models.User)
	if err := row.Scan(&u.ID, &u.Email); err != nil {
		return nil, err
	}

	return u, nil
}

func (s *UserService) UpdatePassword(ctx context.Context, user *models.User) error {
	hashedPassword, err := s.HashPassword(user.Password)

	if err != nil {
		return err
	}

	q := `
		UPDATE users SET
			updated_at = now(),
			password = $2,
			rpt_expired_at = '0001-01-01 00:00:00',
			reset_pwd_token = ''
		WHERE id = $1
	`

	_, qerr := s.db.conn.ExecContext(ctx, q,
		user.ID,
		hashedPassword,
	)

	return qerr
}

func (s *UserService) LogSendVerifyEmail(ctx context.Context, user *models.User) error {
	user.EmailToken = helper.RandString(6)

	q := `
		update users set
			email = $2,
			send_verified_email_at = now(),
			email_token = $3
		where id = $1
	`
	_, err := s.db.conn.ExecContext(ctx, q, user.ID, user.Email, user.EmailToken)
	return err
}

func (s *UserService) AddRole(ctx context.Context, user *models.User, role string) error {
	for _, s := range user.Roles {
		if s == role {
			return errors.New("err_duplicated_role")
		}
	}
	q := `update users set roles = array_append(roles, $2) where id = $1`
	_, err := s.db.conn.ExecContext(ctx, q, user.ID, role)
	return err
}

func (s *UserService) FindByEmailToken(ctx context.Context, token string) (*models.User, error) {
	users, _, err := s.FindUsers(ctx, models.UserFilter{
		EmailToken: token,
		Limit:      1,
	})

	if err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, ErrUserNotFound
	}
	return users[0], nil
}
