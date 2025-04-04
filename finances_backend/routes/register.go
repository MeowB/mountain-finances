package routes

import (
	"backend/database"
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
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

	query := `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`
	_, err := database.DB.Exec(context.Background(), query, user.Username, user.Email, user.Password)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create user: %v", err)})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered succesfully"})
}
