package routes

import (
	"backend/database"
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SelectUsers(c *gin.Context) {
	// Query to select all users
	query := `SELECT id, username, email FROM users`

	// Execute the query
	rows, err := database.DB.Query(context.Background(), query)
	if err != nil {
		// Handle the error properly and respond with a 500 status code
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to fetch users: %v", err)})
		return
	}
	defer rows.Close()

	// Initialize a slice to store users
	var users []User

	// Loop through the rows and scan them into the User struct
	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Username, &user.Email)
		if err != nil {
			// Handle scanning errors
			log.Println("Failed to scan row:", err)
			continue
		}
		// Append the user to the slice
		users = append(users, user)
	}

	// Check for any row iteration errors
	if err := rows.Err(); err != nil {
		log.Println("Row iteration error:", err)
		c.JSON(500, gin.H{"error": "Failed to process query result"})
		return
	}

	// Respond with the users in JSON format
	c.JSON(200, gin.H{"users": users})
}
