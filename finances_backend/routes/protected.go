package routes

import (
	"github.com/gin-gonic/gin"
)

func ProtectedRoute(c *gin.Context) {

	c.JSON(200, gin.H{"message": "hit the protected route"})
}
