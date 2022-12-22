package utils

import (
	"encoding/json"
	"net/http"

	"ericodesu.com/portfolio/api/consts"
	"ericodesu.com/portfolio/api/types"
)

func EmitSucessfulResponseArray[T any](response http.ResponseWriter, payload *[]T) {
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

func EmitSucessfulResponse[T any](response http.ResponseWriter, payload *T) {
	emitCustomResponse(response, true, payload)
}

func EmitUnsuccessfulResponse(response http.ResponseWriter, code int, description string) {
	var errorStatus types.ErrorStatus

	if len(description) > 0 {
		errorStatus = types.ErrorStatus{
			Code:        code,
			Description: description,
		}
	} else {
		errorStatus = consts.GetGenericErrorStatus(code)
	}

	emitCustomResponse(response, false, &errorStatus)
}

func setJsonResponse(response http.ResponseWriter) {
	response.Header().Set("Access-Control-Allow-Origin", "*")

	response.Header().Set("Content-Type", "application/json")

	response.WriteHeader(http.StatusOK)
}

func emitCustomResponse[T any](response http.ResponseWriter, wasSuccessful bool, payload *T) {
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
