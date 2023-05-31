package sql

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/clgt/blog/internal/helper"
	"github.com/clgt/blog/internal/models"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrUserNotFound         = errors.New("user not found")
	ErrUserNotVerifiedEmail = errors.New("user not verified email")
	ErrorCannotBlockAdmin   = errors.New("cannot block admin")
	ErrorCannotDeleteAdmin  = errors.New("cannot delete admin")
)

type UserService struct {
	db *DB
}

var userColumes = []string{
	"id",
	"username",
	"email",
	"password",
	"roles",
	"email_token",
	"created_at",
	"updated_at",
	"send_verified_email_at",
	"reset_pwd_token",
	"rpt_expired_at",
	"is_blocked",
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
		pq.Array(&u.Roles),
		&u.EmailToken,
		&u.CreatedAt,
		&u.UpdatedAt,
		&u.SendVerifiedEmailAt,
		&u.ResetPasswordToken,
		&u.RPTExpiredAt,
		&u.IsBlocked,
		&u.Total,
	); err != nil {
		return err
	}

	return nil
}

func (s *UserService) FindUsers(ctx context.Context, filter models.UserFilter) ([]*models.User, int, error) {
	q := fmt.Sprintf(`
		select
			%s, count(*) over() as total
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
		and
			case
				when $5 <> '' then reset_pwd_token=$5
				else true
			end
		order by created_at desc
		limit
			case
				when $6 > 0 then $6
				else null
			end
		offset $7
	`, strings.Join(userColumes, ", "))

	rows, err := s.db.conn.QueryContext(ctx, q, filter.ID, filter.Username, filter.Email, filter.EmailToken, filter.ResetPasswordToken, filter.Limit, filter.Offset)
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

	return users, len(users), err
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
		insert into users (username, email, password)
		values ($1, $2, $3, $4, $5)
		returning id, email
	`
	hashedPassword, err := s.HashPassword(user.Password)
	if err != nil {
		return nil, err
	}

	row := s.db.conn.QueryRowContext(ctx, q,
		user.Username,
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

func (s *UserService) LogSendResetPassword(ctx context.Context, email string) (*models.User, error) {
	users, _, err := s.FindUsers(ctx, models.UserFilter{
		Email: email,
		Limit: 1,
	})
	if err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, ErrUserNotFound
	}
	user := users[0]

	// user must have verified email
	if !helper.Contains("verified_email", user.Roles) {
		return nil, ErrUserNotVerifiedEmail
	}

	user.ResetPasswordToken = helper.RandString(6)

	q := `
		update users set
			updated_at = now(),
			reset_pwd_token = $2,
			rpt_expired_at = now() + (15 * interval '1 minute')
		where id = $1
		returning id
	`
	_, err = s.db.conn.ExecContext(ctx, q, user.ID, user.ResetPasswordToken)
	if err != nil {
		return nil, err
	}
	user, err = s.FindByID(ctx, user.ID)
	return user, err
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

func (s *UserService) FindByRPT(ctx context.Context, token string) (*models.User, error) {
	users, _, err := s.FindUsers(ctx, models.UserFilter{
		ResetPasswordToken: token,
		Limit:              1,
	})

	if err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, ErrUserNotFound
	}
	return users[0], nil
}

func (s *UserService) HasRole(ctx context.Context, id int, role string) (bool, error) {
	users, _, err := s.FindUsers(ctx, models.UserFilter{
		ID:    id,
		Limit: 1,
	})

	if err != nil {
		return false, err
	}
	if len(users) == 0 {
		return false, ErrUserNotFound
	}

	return helper.Contains(role, users[0].Roles), nil
}

func (s *UserService) Block(ctx context.Context, id int) error {
	isAdmin, err := s.HasRole(ctx, id, "admin")
	if err != nil {
		return err
	}
	if isAdmin {
		return ErrorCannotBlockAdmin
	}
	q := `
		update users
		set
			is_blocked = not(coalesce(is_blocked, false)),
			updated_at = now()
		where id = $1`

	_, err = s.db.conn.ExecContext(ctx, q, id)
	return err
}

func (s *UserService) Delete(ctx context.Context, id int) error {
	isAdmin, err := s.HasRole(ctx, id, "admin")
	if err != nil {
		return err
	}
	if isAdmin {
		return ErrorCannotDeleteAdmin
	}

	// delete user
	q := `
		delete from users
		where id = $1
	`
	_, err = s.db.conn.ExecContext(ctx, q, id)
	return err
}
