package sql

import (
	"context"
	"fmt"
	"io/fs"
	"os"
	"sort"

	"github.com/clgt/blog/internal/config"
	"github.com/jmoiron/sqlx"
	"github.com/rs/xid"

	// sqlx "database/sql"

	"github.com/lib/pq"
)

// go:embed migration/*.sql
// var migrationFS embed.FS
var migrationFS fs.FS = os.DirFS("internal/sql")

type DB struct {
	conn   *sqlx.DB
	ctx    context.Context
	cancel func()

	Datasource string
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

	if db.conn, err = sqlx.Open("postgres", db.Datasource); err != nil {
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
	tx, err := db.conn.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	var n int
	if err := db.conn.QueryRow(`select count(*) from migrations where name = $1`, file).Scan(&n); err != nil {
		if e, ok := err.(*pq.Error); !ok {
			return err
		} else if e.Code.Name() != "undefined_table" {
			return err
		}
	} else if n != 0 {
		return nil
	}

	if buf, err := fs.ReadFile(migrationFS, file); err != nil {
		return err
	} else if _, err := tx.Exec(string(buf)); err != nil {
		return err
	}

	if _, err := tx.Exec(`insert into migrations (name) values($1);`, file); err != nil {
		return err
	}

	return tx.Commit()
}

func (db *DB) Close() error {
	db.cancel()

	if db.conn != nil {
		return db.conn.Close()
	}
	return nil
}

func NewID() string {
	return xid.New().String()
}
