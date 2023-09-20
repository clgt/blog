package sql

import (
	"context"
	"embed"
	"fmt"
	"io/fs"
	"sort"

	"github.com/clgt/blog/internal/config"
	"github.com/rs/xid"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

//go:embed migration/*.sql
var migrationFS embed.FS

type DB struct {
	Conn   *pgx.Conn
	ctx    context.Context
	cancel func()

	Datasource string
}

type Scanner interface {
	Scan(dest ...interface{}) error
}

func NewDB(cfg *config.Config) *DB {
	db := &DB{
		Datasource: cfg.Datasource,
	}
	db.ctx, db.cancel = context.WithCancel(context.Background())
	return db
}

func (db *DB) Open() (err error) {
	if db.Datasource == "" {
		return fmt.Errorf("required: Datasource")
	}

	if db.Conn, err = pgx.Connect(db.ctx, db.Datasource); err != nil {
		return err
	}

	if err := db.migrate(); err != nil {
		return err
	}

	return nil
}

func (db *DB) migrate() error {
	files, err := fs.Glob(migrationFS, "migration/*.sql")
	if err != nil {
		return err
	}
	sort.Strings(files)

	for _, file := range files {
		if err := db.Run(file); err != nil {
			return err
		}
	}
	return nil
}

// Run execute content of sql file into database
func (db *DB) Run(file string) error {
	var n int
	if err := db.Conn.QueryRow(db.ctx, `select count(*) from migrations where name = $1`, file).Scan(&n); err != nil {
		if e, ok := err.(*pgconn.PgError); !ok {
			return err
		} else if e.Code != "42P01" {
			return err
		}
	} else if n != 0 {
		return nil
	}

	tx, err := db.Conn.Begin(db.ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(db.ctx)

	if buf, err := fs.ReadFile(migrationFS, file); err != nil {
		return err
	} else if _, err := tx.Exec(db.ctx, string(buf)); err != nil {
		return fmt.Errorf("failed to execute %s: %w", file, err)
	}

	if _, err := tx.Exec(db.ctx, `insert into migrations (name) values($1);`, file); err != nil {
		return err
	}

	return tx.Commit(db.ctx)
}

func (db *DB) Close() error {
	db.cancel()

	if db.Conn != nil {
		return db.Conn.Close(db.ctx)
	}
	return nil
}

func NewID() string {
	return xid.New().String()
}
