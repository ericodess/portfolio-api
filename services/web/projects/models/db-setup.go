package models

import (
	"database/sql"
	"os"
	"time"

	"github.com/go-sql-driver/mysql"
	_ "github.com/go-sql-driver/mysql"
)

var cfg = mysql.Config{
	User:                 os.Getenv("DATABASE_USER"),
	Passwd:               os.Getenv("DATABASE_PASSWORD"),
	Net:                  "tcp",
	Addr:                 os.Getenv("DATABASE_HOST") + ":3306",
	DBName:               os.Getenv("DATABASE_NAME"),
	AllowNativePasswords: true,
}

var db, err = sql.Open("mysql", cfg.FormatDSN())

var pingCount = 0

func init() {
	if err != nil {
		panic(err)
	}

	db.SetConnMaxLifetime(time.Minute * 3)

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
}

func ExecQuerry(queryString string, queryArgs ...any) *sql.Rows {
	pingCount = 0

	if err != nil {
		panic(err)
	}

	pingErr := db.Ping()

	if pingErr != nil {
		panic(pingErr)
	}

	query, querryErr := db.Query(queryString, queryArgs...)

	if querryErr != nil {
		panic(querryErr)
	}

	return query
}
