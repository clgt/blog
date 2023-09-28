package config

import (
	"encoding/json"
	"net/url"
	"os"
)

var DefaultConfigPath = "config.json"

// Config for this project
type Config struct {
	Database         string     `json:"db"`
	Cloudflare       Cloudflare `json:"cf"`
	Backblaze        Backblaze  `json:"b2"`
	AllowNewAccounts bool       `json:"allow_new_accounts"`
}

func (c *Config) Validate() error {
	return nil
}

// Default config
func (c *Config) Default() error {
	if err := c.Cloudflare.Default(); err != nil {
		return err
	}
	if err := c.Backblaze.Default(); err != nil {
		return err
	}

	return nil
}

// Parse config from json byte
func Parse(b []byte, path string) (*Config, error) {
	c := &Config{}
	if err := json.Unmarshal(b, c); err != nil {
		return nil, err
	}
	if err := c.Default(); err != nil {
		return nil, err
	}
	return c, nil
}

// Read the config from `path`
func Read(path string) (*Config, error) {
	b, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	return Parse(b, path)
}

// Update the config from config form
func (c *Config) Update(form url.Values) error {
	// database
	c.Database = form.Get("database")

	if err := c.Cloudflare.Update(form); err != nil {
		return err
	}
	if err := c.Backblaze.Update(form); err != nil {
		return err
	}

	// allow new accounts
	c.AllowNewAccounts = form.Get("allow_new_accounts") == "true"

	return nil
}

func (c *Config) Save(path string) error {
	b, err := json.MarshalIndent(c, "", "\t")
	if err != nil {
		return err
	}
	return os.WriteFile(path, b, 0644)
}
