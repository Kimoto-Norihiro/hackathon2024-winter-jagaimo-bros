package controller

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"os"
	"regexp"

	"github.com/gin-gonic/gin"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"

	"github.com/PRTIMES/hackathon2024-winter-jagaimo-bros/ex_api"
)

type Quiz struct {
	Question string   `json:"question"`
	Choices  []string `json:"choices"`
	Answer   int      `json:"answer"`
}

type GenerateQuizByIndustryIDInput struct {
	IndustryID int `uri:"industry_id" binding:"required"`
}

func GenerateQuizByIndustryID(c *gin.Context) {
	var input GenerateQuizByIndustryIDInput
	if err := c.ShouldBindUri(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	companies, err := ex_api.GetCompanies(input.IndustryID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	var company *ex_api.Company
	var pressReleases []*ex_api.PressRelease

	// retry 999 times
	for j := 0; j < 999; j++ {
		i := rand.Intn(len(companies))
		company = companies[i]

		prs, err := ex_api.ListPressReleases(company.ID)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		if len(prs) > 0 {
			pressReleases = prs
			break
		}
	}

	i := rand.Intn(len(pressReleases))
	pr := pressReleases[i]

	quiz, err := generateQuiz(c, pr.Body)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"press_release_ID": pr, "quiz": quiz})
}

func generateQuiz(ctx context.Context, body string) (*Quiz, error) {
	text := removeTag(body)
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_TOKEN")))
	if err != nil {
		return nil, err
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-pro")

	prompt := fmt.Sprintf(`%s
		以上の文章を元に、以下のような内容を生成してください。

		文章の内容に関する4択問題を1つ作成してください。

		表示形式については、以下のようなJson形式で表示してください。余分な情報は含めないでください。

		{
			"question": "問題文",
			"choices": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
			"answer": 0 // 正解の選択肢のインデックス
		}
		`, text)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, err
	}

	quizStr, err := ResponseToString(resp)
	if err != nil {
		return nil, err
	}

	log.Println(quizStr)

	var quiz Quiz
	if err := json.Unmarshal([]byte(quizStr), &quiz); err != nil {
		return nil, err
	}

	return &quiz, nil
}

func ResponseToString(resp *genai.GenerateContentResponse) (string, error) {
	cand := resp.Candidates[0]
	if cand.Content != nil {
		part := cand.Content.Parts[0]
		text, ok := part.(genai.Text)
		if ok {
			return string(text), nil
		}
	}
	return "", errors.New("no text found in response")
}

func removeTag(str string) string {
	rep := regexp.MustCompile(`<("[^"]*"|'[^']*'|[^'">])*>`)
	str = rep.ReplaceAllString(str, "")
	return str
}
