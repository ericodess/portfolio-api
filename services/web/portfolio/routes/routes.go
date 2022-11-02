package routes

import (
	"github.com/gorilla/mux"
)

var routes = mux.NewRouter()

var mainRoute = routes.PathPrefix("/portfolio/api/v1").Subrouter()

func init() {
	mainRoute.Path("/projects").HandlerFunc(GetUserProjects).Methods("GET")
}

func GetRoutes() *mux.Router {
	return mainRoute
}
