package routes

import (
	"backend/auth"
	"backend/database"
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

type NewUser struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RegisterUser(c *gin.Context) {
	var user NewUser

	// set user variable with JSON from the request
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid data: %v", err)})
		return
	}

	query := `SELECT * FROM users WHERE email = $1`
	var emailID int
	emailErr := database.DB.QueryRow(context.Background(), query, user.Email).Scan(&emailID)

	query = `SELECT * FROM users WHERE username = $1`
	var usernameID int
	usernameErr := database.DB.QueryRow(context.Background(), query, user.Username).Scan((&usernameID))

	if usernameErr != pgx.ErrNoRows {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already in use"})
		return
	}

	if emailErr != pgx.ErrNoRows {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already in use"})
		return
	}

	hashedPassword, err := auth.HashPassword(user.Password)

	insertQuery := `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`
	_, insertErr := database.DB.Exec(context.Background(), insertQuery, user.Username, user.Email, hashedPassword)

	if insertErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create user: %v", err)})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered succesfully"})
}
