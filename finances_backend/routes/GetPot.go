package routes

import (
	"backend/database"
	"context"
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

func GetPots(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
		return
	}

	query := `
		SELECT id, name, total_saved, target_amount, color 
		FROM pots
		WHERE user_id = $1
	`

	rows, err := database.DB.Query(context.Background(), query, userID)
	if err != nil {
		log.Printf("DB query error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pots"})
		return
	}
	defer rows.Close()

	var pots []Pot
	for rows.Next() {
		var pot Pot
		if err := rows.Scan(&pot.ID, &pot.Name, &pot.TotalSaved, &pot.TargetAmount, &pot.Color); err != nil {
			log.Printf("Scan error: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read pot data"})
			return
		}
		pots = append(pots, pot)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Rows error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error processing pots"})
		return
	}

	c.JSON(http.StatusOK, pots)
}
