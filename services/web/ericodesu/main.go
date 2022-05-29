package main

import (
	"net/http"

	"ericodesu.dev/portfolio/api/utils"
	"github.com/gorilla/mux"
)

type HelloMessage struct {
	Message string
}

func GetRootPage(w http.ResponseWriter, rq *http.Request) {
	rootResponse := HelloMessage{
		Message: "Hewwo there",
	}

	utils.EmitSucessfulResponse(w, &rootResponse)
}

func main() {
	response := mux.NewRouter()

	response.HandleFunc("/", GetRootPage)

	http.ListenAndServe(":9001", response)
}
