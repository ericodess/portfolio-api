package main

import (
	"net/http"

	_ "ericodesu.com/portfolio/api/environment"
	"ericodesu.com/portfolio/api/routes"
)

func main() {
	http.ListenAndServe(":9001", routes.GetRoutes())
}
