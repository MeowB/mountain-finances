package routes

import (
	"backend/database"
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

func GetUserByEmail(c *gin.Context) {
	email := c.Query("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email query parameter is required"})
		return
	}

	var user User
	query := "SELECT id, username, email FROM users WHERE email = $1"

	err := database.DB.QueryRow(context.Background(), query, email).Scan(&user.ID, &user.Username, &user.Email)
	if err != nil {
		if err == pgx.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Database error: %v", err)})
		}
		return
	}

	c.JSON(http.StatusOK, user)
}
