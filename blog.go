package blog

import (
	"github.com/clgt/blog/internal/config"
)

type Config = config.Config

var ReadConfig = config.Read

type Project struct {
	config *Config
}

func New(c *Config) *Project {
	return &Project{
		config: c,
	}
}
