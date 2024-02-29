package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	cors "github.com/rs/cors/wrapper/gin"

	"github.com/PRTIMES/hackathon2024-winter-jagaimo-bros/controller"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	r := gin.Default()

	r.Use(cors.Default())
	r.GET("companies/:company_id/releases/:release_id", controller.GetPressRelease)
	r.GET("generate_quiz/industries/:industry_id", controller.GenerateQuizByIndustryID)

	r.Run(":8000")
}
