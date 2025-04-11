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

func LoginUser(c *gin.Context) {
	var user struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	// link the request body to the user object
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid data: %v", err)})
		return
	}

	// Check if user exists (email/username)
	query := `SELECT id, password FROM users WHERE email = $1`
	var storedPassword string
	var userID int

	err := database.DB.QueryRow(context.Background(), query, user.Email).Scan(&userID, &storedPassword)
	if err != nil {
		if err == pgx.ErrNoRows {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error checking user: %v", err)})
		return
	}

	// Verify password against stored hash
	if err := auth.CheckPasswordHash(user.Password, storedPassword); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token, err := auth.GenerateJWT(user.Email, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error generating token: %v", err)})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   token,
	})

}
