package app

import (
	"github.com/clgt/blog/internal/cli/root"
	"github.com/urfave/cli/v2"
	"os"
)

func Run() error {
	root.Cmd.Commands = []*cli.Command{}
	return root.Cmd.Run(os.Args)
}
