package routes

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var routes = mux.NewRouter()

var mainRoute = routes.PathPrefix("/projects/api/v1").Subrouter()

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.Method + " " + r.RequestURI)

		next.ServeHTTP(w, r)
	})
}

func init() {
	routes.Use(loggingMiddleware)

	mainRoute.Use(loggingMiddleware)

	mainRoute.Path("").HandlerFunc(GetUserProjects).Methods("GET")
}

func GetRoutes() *mux.Router {
	return mainRoute
}
