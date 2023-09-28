package config

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strings"
	"time"
)

type Cloudflare struct {
	CaptchaKey    string `json:"captcha_key"`
	CaptchaSecret string `json:"captcha_secret"`
}

const endpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

var client = &http.Client{
	Timeout: 5 * time.Second,
}

type response struct {
	Success     bool     `json:"success"`
	ChallengeTs string   `json:"challenge_ts"`
	Hostname    string   `json:"hostname"`
	ErrorCodes  []string `json:"error-codes"`
	Action      string   `json:"action"`
	Cdata       string   `json:"cdata"`
}

func (c *Cloudflare) Validate() error {
	return nil
}

func (c *Cloudflare) Default() error {
	return nil
}

func (c *Cloudflare) Enable() bool {
	return c.CaptchaKey != "" && c.CaptchaSecret != ""
}

func (c *Cloudflare) Verify(token string) bool {
	if !c.Enable() {
		return true
	}

	form := url.Values{}
	form.Add("secret", c.CaptchaSecret)
	form.Add("response", token)

	req, _ := http.NewRequest("POST", endpoint, strings.NewReader(form.Encode()))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	res, err := client.Do(req)
	if err != nil {
		return false
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		return false
	}

	data := new(response)
	if err = json.NewDecoder(res.Body).Decode(data); err != nil {
		return false
	}

	return data.Success
}

func (c *Cloudflare) Update(form url.Values) error {
	c.CaptchaKey = form.Get("cf_captcha_key")
	c.CaptchaSecret = form.Get("cf_captcha_secret")
	return nil
}
