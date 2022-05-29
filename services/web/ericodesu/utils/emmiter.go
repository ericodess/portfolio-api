package utils

import (
	"encoding/json"
	"net/http"

	"ericodesu.dev/portfolio/api/consts"
	"ericodesu.dev/portfolio/api/types"
)

func EmitSucessfulResponseArray[T comparable](response http.ResponseWriter, payload *[]T) {
	convertedPayload := types.GenericResponse{
		WasSuccessful: true,
		Result:        payload,
	}

	jsonData, jsonError := json.Marshal(convertedPayload)

	if jsonError == nil {
		setJsonResponse(response)

		response.Write(jsonData)
	}
}

func EmitSucessfulResponse[T comparable](response http.ResponseWriter, payload *T) {
	emitCustomResponse(response, true, payload)
}

func EmitUnsuccessfulResponse(response http.ResponseWriter, code int, description ...string) {
	var errorStauts types.ErrorStatus

	if len(description) > 0 {
		errorStauts = types.ErrorStatus{
			Code:        code,
			Description: description[0],
		}
	} else {
		errorStauts = consts.GetGenericErrorStatus(code)
	}

	emitCustomResponse(response, false, &errorStauts)
}

func setJsonResponse(response http.ResponseWriter) {
	response.Header().Set("Content-Type", "application/json")

	response.WriteHeader(http.StatusCreated)
}

func emitCustomResponse[T comparable](response http.ResponseWriter, wasSuccessful bool, payload *T) {
	convertedPayload := types.GenericResponse{
		WasSuccessful: wasSuccessful,
		Result:        payload,
	}

	jsonData, jsonError := json.Marshal(convertedPayload)

	if jsonError == nil {
		setJsonResponse(response)

		response.Write(jsonData)
	}
}
