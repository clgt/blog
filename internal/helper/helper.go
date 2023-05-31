package helper

import (
	"fmt"
	"math/rand"
	"time"
)

// Contains return true if `s“ in `list`
func Contains(s string, list []string) bool {
	for _, v := range list {
		if v == s {
			return true
		}
	}
	return false
}

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func ParseTime(s string) (*time.Time, error) {
	loc, err := time.LoadLocation("Asia/Ho_Chi_Minh")
	if err != nil {
		return nil, fmt.Errorf("load location: %w", err)
	}
	t1, err := time.ParseInLocation("2006-01-02T15:04:05", s, loc)
	if err == nil {
		return &t1, nil
	}
	t2, err := time.ParseInLocation("2006-01-02T15:04", s, loc)
	if err == nil {
		return &t2, nil
	}
	return nil, err
}
