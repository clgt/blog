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

	Total int64
}
