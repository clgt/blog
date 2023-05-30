package models

import (
	"time"
)

type User struct {
	ID                  int
	Username            string
	Email               string
	Password            string
	FirstName           string
	LastName            string
	Roles               []string
	EmailToken          string
	CreatedAt           time.Time
	UpdatedAt           time.Time
	SendVerifiedEmailAt time.Time
	ResetPasswordToken  string
	RPTExpiredAt        time.Time
	IsBlocked           bool

	Total int64
}

type UserFilter struct {
	ID                 int
	Username           string
	Email              string
	EmailToken         string
	ResetPasswordToken string

	Limit  int
	Offset int
}
