package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddPot(c *gin.Context) {
	var pot Pot

	if err := c.ShouldBindJSON(&pot); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

}
