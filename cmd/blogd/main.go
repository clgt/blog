// the start of all things.

package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"os/signal"

	"github.com/clgt/blog/internal/config"
	"github.com/clgt/blog/internal/http"
	"github.com/clgt/blog/internal/sql"
)

type App struct {
	Config     *config.Config
	ConfigPath string

	DB         *sql.DB
	HTTPServer *http.Server
}

func NewApp(cfg *config.Config) *App {
	return &App{
		Config:     cfg,
		DB:         sql.NewDB(cfg),
		HTTPServer: http.NewServer(cfg),
	}
}

func main() {
	// grateful shutdown
	ctx, cancel := context.WithCancel(context.Background())
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		<-c
		cancel()
	}()

	// load config
	cfg, err := config.Read("config.json")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	// start app
	app := NewApp(cfg)

	if err := app.Run(ctx); err != nil {
		app.Close()
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	// cancel func called, close app
	<-ctx.Done()

	if err := app.Close(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

// parse args and load config
func (app *App) ParseFlags(ctx context.Context, args []string) error {
	// custom config path with --config flag
	flag.StringVar(&app.ConfigPath, "config", config.DefaultConfigPath, "config path")
	cfg, err := config.Read(app.ConfigPath)
	if err != nil {
		return err
	}
	app.Config = cfg
	return nil
}

// grateful shutdown all resource and close the app
func (app *App) Close() error {
	if app.HTTPServer != nil {
		if err := app.HTTPServer.Close(); err != nil {
			return err
		}
	}
	if app.DB != nil {
		if err := app.DB.Close(); err != nil {
			return err
		}
	}
	return nil
}

// kick off our app
func (app *App) Run(ctx context.Context) error {

	// register services
	app.HTTPServer.PostService = sql.NewPostService(app.DB)
	app.HTTPServer.UserService = sql.NewUserService(app.DB)

	// open db connection
	if err := app.DB.Open(); err != nil {
		return fmt.Errorf("err open db: %w", err)
	}

	// open http server
	if err := app.HTTPServer.Open(); err != nil {
		return fmt.Errorf("err http server: %w", err)
	}

	return nil
}
