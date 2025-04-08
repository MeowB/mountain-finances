package main

import (
	"backend/auth"
	"backend/database"
	"backend/routes"
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

	// Sample route using Get in the "/" endpoint (context represent the request/response context)
	router.GET("/", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{"message": "Backend is running!"})
	})

	router.POST("/register", routes.RegisterUser)
	router.GET("/getUsers", routes.SelectUsers)
	router.GET("/getUserByEmail", routes.GetUserByEmail)
	router.POST("/login", routes.LoginUser)
	router.GET("/protected", auth.JWTMiddleware(), routes.ProtectedRoute)

	router.Run(":8000")
}
