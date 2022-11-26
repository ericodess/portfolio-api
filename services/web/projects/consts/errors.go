package consts

import (
	"ericodesu.com/portfolio/api/types"
)

func GetGenericErrorStatus(errorCode int) types.ErrorStatus {
	defaultErrorCode := -1
	defaultErrorDescription := "Invalid error code"

	responseError := types.ErrorStatus{
		Code:        errorCode,
		Description: defaultErrorDescription,
	}

	responseError.Code = errorCode

	switch errorCode {
	case 400:
		responseError.Description = "Bad request"
	case 401:
		responseError.Description = "Unauthorized"
	case 402:
		responseError.Description = "Payment required"
	case 403:
		responseError.Description = "Forbidden"
	case 404:
		responseError.Description = "Not Found"
	case 405:
		responseError.Description = "Method not allowed"
	case 406:
		responseError.Description = "Not acceptable"
	case 407:
		responseError.Description = "Proxy authentication required"
	case 408:
		responseError.Description = "Request timeout"
	case 409:
		responseError.Description = "Conflict"
	case 410:
		responseError.Description = "Gone"
	case 411:
		responseError.Description = "Length required"
	case 412:
		responseError.Description = "Precondition failed"
	case 413:
		responseError.Description = "Payload too large"
	case 414:
		responseError.Description = "URI too long"
	case 415:
		responseError.Description = "Unsupported media type"
	case 416:
		responseError.Description = "Range not satisfiable"
	case 417:
		responseError.Description = "Expectation failed"
	case 418:
		responseError.Description = "私はティーポットです～"
	case 421:
		responseError.Description = "Misdirected request"
	case 422:
		responseError.Description = "Unprocessable entity"
	case 423:
		responseError.Description = "Locked"
	case 424:
		responseError.Description = "Failed dependency"
	case 426:
		responseError.Description = "Upgrade required"
	case 428:
		responseError.Description = "Precondition required"
	case 420:
		responseError.Description = "Too many requests"
	case 431:
		responseError.Description = "Request header fields too large"
	case 451:
		responseError.Description = "Unavailable for legal reasons"
	case 500:
		responseError.Description = "Internal server error"
	case 501:
		responseError.Description = "Not implemented"
	case 502:
		responseError.Description = "Bad gateway"
	case 503:
		responseError.Description = "Service unavailable"
	case 504:
		responseError.Description = "Gateway timeout"
	case 505:
		responseError.Description = "Http version not supported"
	case 506:
		responseError.Description = "Variant also negotiates"
	case 507:
		responseError.Description = "Insufficient storage"
	case 508:
		responseError.Description = "Loop detected"
	case 510:
		responseError.Description = "Not extended"
	case 511:
		responseError.Description = "Network authentication required"
	}

	if responseError.Description == defaultErrorDescription {
		responseError.Code = defaultErrorCode
	}

	return responseError
}
