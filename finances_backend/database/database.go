package database

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

// database connection pool
var DB *pgxpool.Pool

func ConnectDB() {
	databaseUrl := "postgres://postgres:HAMILTON10:@localhost:5432/finances"

	var err error
	DB, err = pgxpool.New(context.Background(), databaseUrl)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	fmt.Println("Connected to PostgreSQL successfully!")
}
