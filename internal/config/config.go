package config

import (
	"encoding/json"
	"fmt"
	"os"
)

var DefaultConfigPath = "config.json"

// Config for this project
type Config struct {
	Path          string
	Datasource    string
	ListenAddress string
}

// Default config
func (c *Config) Default() error {
	if c.ListenAddress == "" {
		c.ListenAddress = ":3000"
	}
	return nil
}

func (c *Config) Save() error {
	fmt.Println("config: save config.json")
	b, _ := json.MarshalIndent(c, "", "  ")
	return os.WriteFile(c.Path, b, 0644)
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
	c.Path = path
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

// Create the sample config file
func Create() error {
	fmt.Println("config: create config.json")
	b, _ := json.MarshalIndent(Config{}, "", "  ")
	return os.WriteFile("config.json", b, 0644)
}
