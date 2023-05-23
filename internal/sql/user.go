package sql

import (
	"context"
	"errors"

	"github.com/clgt/blog/internal/form"
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

func scanUser(r interface {
	Scan(dest ...interface{}) error
}, o *models.User) error {
	if err := r.Scan(
		&o.ID,
		&o.Username,
		&o.Email,
		&o.Password,
		&o.FirstName,
		&o.LastName,
		pq.Array(&o.Roles),
		&o.EmailToken,
		&o.CreatedAt,
		&o.UpdatedAt,
		&o.SendVerifiedEmailAt,
		&o.ResetPasswordToken,
		&o.RPTExpiredAt,
	); err != nil {
		return err
	}

	return nil
}

func (s *UserService) ID(id string) (*models.User, error) {
	if id == "" {
		return nil, errors.New("err_id_empty")
	}
	q := `select * from users where users.id = $1`
	row := s.db.conn.QueryRow(q, id)
	o := new(models.User)
	if err := scanUser(row, o); err != nil {
		return nil, err
	}
	return o, nil
}

func (s *UserService) Auth(ctx context.Context, f *form.Form) (*models.User, error) {
	q := `
		select id, password from users where username = $1
	`
	var id int
	var hashed string
	row := s.db.conn.QueryRowContext(ctx, q, f.Get("Username"))
	if err := row.Scan(&id, &hashed); err != nil {
		return nil, err
	}

	if err := s.CompareHashAndPassword(hashed, f.Get("Password")); err != nil {
		return nil, err
	}

	return &models.User{ID: id}, nil
}

func (s *UserService) Create(ctx context.Context, f *form.Form) (*models.User, error) {
	q := `
		insert into users (username, first_name, last_name, email, password, email_token)
		values ($1, $2, $3, $4, $5, $6)
		returning id
	`
	hashedPassword, err := s.HashPassword(f.Get("Password"))
	if err != nil {
		return nil, err
	}

	row := s.db.conn.QueryRowContext(ctx, q,
		f.Get("Username"),
		f.Get("FirstName"),
		f.Get("LastName"),
		f.Get("Email"),
		hashedPassword,
		helper.RandString(6),
	)
	o := new(models.User)
	if err := row.Scan(&o.ID); err != nil {
		return nil, err
	}

	return o, nil
}

func (s *UserService) UpdateNewPassword(ctx context.Context, userId string, password string) error {
	hashedPassword, err := s.HashPassword(password)

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
		userId,
		hashedPassword,
	)

	return qerr
}
