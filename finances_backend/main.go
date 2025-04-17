package main

import (
	"backend/database"
	"backend/middleware"
	"backend/routes"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
)

// requests

// framework

func main() {

	//Connect to PostgreSQL
	database.ConnectDB()

	// Create the router using the GIN framework
	router := gin.Default()

	// global middleware for userID
	router.Use(middleware.UserIDMiddleware())

	// Sample route using Get in the "/" endpoint (context represent the request/response context)
	router.GET("/", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{"message": "Backend is running!"})
	})

	router.POST("/register", routes.RegisterUser)
	router.GET("/getUsers", routes.SelectUsers)
	router.GET("/getUserByEmail", routes.GetUserByEmail)
	router.POST("/login", routes.LoginUser)
	router.GET("/protected", middleware.JWTMiddleware(), routes.ProtectedRoute)
	router.POST("/addPot", routes.AddPot)
	router.GET("getPots", routes.GetPots)

	router.GET("/ping", func(c *gin.Context) {
		userID, exists := c.Get("userID")

		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
			return
		}

		fmt.Println("user id: ", userID)

		c.String(http.StatusOK, "pong")
	})

	router.Run(":8000")
}
