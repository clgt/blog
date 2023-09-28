package main

import (
	"github.com/clgt/log"
	"github.com/clgt/log/handlers/cli"

	"github.com/clgt/blog/internal/cli/app"
)

func main() {
	log.SetHandler(cli.Default)
	log.SetLevel(log.DebugLevel)

	if err := app.Run(); err != nil {
		log.WithError(err).Fatal("app run")
	}
}
