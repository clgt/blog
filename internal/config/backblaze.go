package config

import "net/url"

type Backblaze struct {
	KeyID      string `json:"key_id"`
	KeySecret  string `json:"key_secret"`
	BucketName string `json:"bucket_name"`
	Endpoint   string `json:"endpoint"`
}

func (r *Backblaze) Validate() error {
	return nil
}

func (r *Backblaze) Default() error {
	return nil
}

func (r *Backblaze) Update(form url.Values) error {
	r.KeyID = form.Get("b2_key_id")
	r.KeySecret = form.Get("b2_key_secret")
	r.BucketName = form.Get("b2_bucket_name")
	r.Endpoint = form.Get("b2_endpoint")
	return nil
}
