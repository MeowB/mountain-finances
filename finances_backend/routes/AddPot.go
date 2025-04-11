package routes

import (
	"backend/database"
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Pot struct {
	ID           int     `json:"id"`
	Name         string  `json:"name"`
	TotalSaved   float64 `json:"total_saved"`
	TargetAmount float64 `json:"target_amount"`
	Color        string  `json:"color"`
}

func AddPot(c *gin.Context) {

	var pot Pot
	userID, exists := c.Get("userID")
	fmt.Println(userID)

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
		return
	}

	if err := c.ShouldBindJSON(&pot); err != nil {
		log.Println("error binding json:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	query := `
		INSERT INTO pots (name, total_saved, target_amount, user_id, color)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id;
	`

	err := database.DB.QueryRow(context.Background(), query, pot.Name, pot.TotalSaved, pot.TargetAmount, userID, pot.Color).Scan(&pot.ID)
	if err != nil {
		// This ensures we get the actual error message
		log.Printf("DB error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create pot"})
		return
	}

	c.JSON(http.StatusOK, pot)
}
