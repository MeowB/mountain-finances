package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"backend/auth"
)

// extract the user id from the token and adds it to the request contect
func UserIDMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		// skip register and login routes
		if c.Request.URL.Path == "/register" || c.Request.URL.Path == "/login" {
			c.Next()
			return
		}

		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
			c.Abort()
			return
		}

		// extract the token string
		var tokenStr string
		_, err := fmt.Sscanf(authHeader, "Bearer %s", &tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
			c.Abort()
			return
		}

		// validate the token and extract the claims
		claims, err := auth.ValidateJWT(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// attach the id to the context
		c.Set("userID", claims.UserID)

		c.Next()
	}
}
