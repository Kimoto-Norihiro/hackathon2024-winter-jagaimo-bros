package ex_api

import (
	"encoding/json"
	"fmt"
)

type PressRelease struct {
	CompanyName      string `json:"company_name"`
	CompanyID        int    `json:"company_id"`
	ReleaseID        int    `json:"release_id"`
	Title            string `json:"title"`
	SubTitle         string `json:"sub_title"`
	Url              string `json:"url"`
	LeadParagraph    string `json:"lead_paragraph"`
	Body             string `json:"body"`
	MainImage        string `json:"main_image"`
	MainImageFastly  string `json:"main_image_fastly"`
	MainCategoryID   int    `json:"main_category_id"`
	MainCategoryName string `json:"main_category_name"`
	SubCategoryID    int    `json:"sub_category_id"`
	SubCategoryName  string `json:"sub_category_name"`
	ReleaseType      string `json:"release_type"`
	CreatedAt        string `json:"created_at"`
	Like             int    `json:"like"`
}

func GetPressRelease(companyID, releaseID int) (*PressRelease, error) {
	url := fmt.Sprintf("https://hackathon.stg-prtimes.net/api/companies/%d/releases/%d", companyID, releaseID)

	body, err := httpGet(url)
	if err != nil {
		return nil, err
	}

	var pressRelease PressRelease
	if err := json.Unmarshal(body, &pressRelease); err != nil {
		return nil, err
	}

	return &pressRelease, nil
}

func ListPressReleases(companyID int) ([]*PressRelease, error) {
	url := fmt.Sprintf("https://hackathon.stg-prtimes.net/api/companies/%d/releases", companyID)

	body, err := httpGet(url)
	if err != nil {
		return nil, err
	}

	pressReleases := make([]*PressRelease, 0)
	if err := json.Unmarshal(body, &pressReleases); err != nil {
		return nil, err
	}

	return pressReleases, nil
}
