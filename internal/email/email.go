package email

import (
	"bytes"
	"crypto/md5"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/clgt/blog/internal/models"
)

var PostmarkApiToken string
var From string = "todo@todo.com"
var Domain string = "http://localhost:3000" // todo: change this

var client = &http.Client{
	Timeout: 45 * time.Second,
}

func SendVerifyEmail(user *models.User) error {
	if PostmarkApiToken == "" {
		return errors.New("PostmarkApiToken=?")
	}

	// sign the url
	qs := fmt.Sprintf(
		"blog:%s:%d:blog",
		user.EmailToken,
		user.SendVerifiedEmailAt.Unix(),
	)
	sign := fmt.Sprintf("%x", md5.Sum([]byte(qs)))
	link := fmt.Sprintf("%s/verify-email?token=%s&iat=%d&sign=%s", Domain, user.EmailToken, user.SendVerifiedEmailAt.Unix(), sign)
	// dùng text cho gọn
	msg := fmt.Sprintf(`
Hi %s,
You have registered an account at on our website.
Please click the link below to verify your email address: %s
`, user.Username, link)

	body, err := json.Marshal(map[string]string{
		"From":          From,
		"To":            user.Email,
		"Subject":       "[Todo] Please verify your email address",
		"TextBody":      msg,
		"MessageStream": "outbound",
	})
	if err != nil {
		return err
	}

	if Domain == "http://localhost:3000" {
		fmt.Println(link)
		return nil
	}
	return SendEmail(body)
}

func SendResetPasswordEmail(user *models.User) error {
	if PostmarkApiToken == "" {
		return errors.New("PostmarkApiToken=?")
	}

	// sign the url
	qs := fmt.Sprintf(
		"blog:%s:%d:blog",
		user.ResetPasswordToken,
		user.RPTExpiredAt.Unix(),
	)
	sign := fmt.Sprintf("%x", md5.Sum([]byte(qs)))
	link := fmt.Sprintf("%s/change-password?token=%s&eat=%d&sign=%s", Domain, user.ResetPasswordToken, user.RPTExpiredAt.Unix(), sign)
	// dùng text cho gọn
	msg := fmt.Sprintf(`
Hi %s,
You have sent a request to reset your password.
Please click the link below to reset your password: %s
`, user.Username, link)

	body, err := json.Marshal(map[string]string{
		"From":          From,
		"To":            user.Email,
		"Subject":       "[Todo] Reset your password",
		"TextBody":      msg,
		"MessageStream": "outbound",
	})
	if err != nil {
		return err
	}

	if Domain == "http://localhost:3000" {
		fmt.Println(link)
		return nil
	}
	return SendEmail(body)
}

func SendEmail(body []byte) error {
	req, err := http.NewRequest("POST", "https://api.postmarkapp.com/email", bytes.NewBuffer(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	req.Header.Set("X-Postmark-Server-Token", PostmarkApiToken)

	res, err := client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		return errors.New(res.Status)
	}

	return nil
}
