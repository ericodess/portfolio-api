package types

type GenericResponse struct {
	WasSuccessful bool `json:"wasSuccessful"`
	Result        any  `json:"result"`
}
