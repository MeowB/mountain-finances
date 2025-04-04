package database

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

// database connection pool
var DB *pgxpool.Pool

func ConnectDB() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	databaseUrl := "postgres://postgres:HAMILTON10@localhost:5432/finances?sslmode=disable"
	if databaseUrl == "" {
		log.Fatal("DATABASE_URL is not set")
	}

	DB, err = pgxpool.New(context.Background(), databaseUrl)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	fmt.Println("Connected to PostgreSQL successfully!")
}
