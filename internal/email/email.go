package email

import (
	"bytes"
	"crypto/md5"
	"encoding/json"
	"errors"
	"fmt"
	"log"
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
	log.Println(user.SendVerifiedEmailAt)
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
Hi %s %s,
You have registered an account at on our website.
Please click the link below to verify your email address: %s
`, user.FirstName, user.LastName, link)

	if Domain == "http://localhost:3000" {
		fmt.Println(link)
		return nil
	}

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
