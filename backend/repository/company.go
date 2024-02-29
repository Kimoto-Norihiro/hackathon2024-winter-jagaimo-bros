package repository

import (
	"encoding/json"
	"fmt"
)

type Company struct {
	ID   int    `json:"company_id"`
	Name string `json:"company_name"`
}

func GetCompanies(industryID int) ([]*Company, error) {
	url := fmt.Sprintf("https://hackathon.stg-prtimes.net/api/industries/%d/companies?per_page=999", industryID)

	body, err := httpGet(url)
	if err != nil {
		return nil, err
	}

	companies := make([]*Company, 0)
	if err := json.Unmarshal(body, &companies); err != nil {
		return nil, err
	}

	return companies, nil
}
