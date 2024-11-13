package utils

import "encoding/json"

type ActionMetadata struct {
	Body  string `json:"body"`
	Email string `json:"email"`
}

// Shorter version of the destructure function
func DestructureMetadata(metadata string) (*ActionMetadata, error) {
	var metadataStruct ActionMetadata
	if err := json.Unmarshal([]byte(metadata), &metadataStruct); err != nil {
		return nil, err
	}
	return &metadataStruct, nil
}
