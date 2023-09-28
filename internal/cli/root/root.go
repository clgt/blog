package root

import (
	"github.com/clgt/blog"
	"github.com/pkg/errors"
	"github.com/urfave/cli/v2"
)

// Cmd is the root command.
var Cmd = cli.NewApp()

var Init func(ctx *cli.Context) (*blog.Config, *blog.Project, error)

func init() {

	Cmd.Name = "blog"
	Cmd.Usage = "clgt/blog cli tool"
	Cmd.Version = "master"

	Cmd.Before = func(ctx *cli.Context) error {
		Init = func(ctx *cli.Context) (*blog.Config, *blog.Project, error) {
			c, err := blog.ReadConfig("config.json")
			if err != nil {
				return nil, nil, errors.Wrap(err, "read config")
			}
			return c, blog.New(c), nil
		}

		return nil
	}
}
