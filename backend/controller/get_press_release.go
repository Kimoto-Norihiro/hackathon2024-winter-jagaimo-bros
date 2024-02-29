package controller

import (
	"github.com/gin-gonic/gin"

	"github.com/PRTIMES/hackathon2024-winter-jagaimo-bros/ex_api"
)

type GetPressReleaseInput struct {
	CompanyID int `uri:"company_id" binding:"required"`
	ReleaseID int `uri:"release_id" binding:"required"`
}

func GetPressRelease(c *gin.Context) {
	var input GetPressReleaseInput
	if err := c.ShouldBindUri(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	pr, err := ex_api.GetPressRelease(input.CompanyID, input.ReleaseID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, pr)
}
