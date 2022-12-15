package routes

import (
	"context"
	"net/http"
	"os"

	"ericodesu.com/portfolio/api/models"
	"ericodesu.com/portfolio/api/types"
	"ericodesu.com/portfolio/api/utils"
	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

func getApiKey(w http.ResponseWriter) string {
	queryResult := models.ExecQuerry("SELECT api_key_value FROM "+os.Getenv("GITHUB_API_SCHEMA_NAME")+" WHERE api_key_id = ?", os.Getenv("GITHUB_API_ORIGIN"))

	apiValue := ""

	for queryResult.Next() {
		scanErr := queryResult.Scan(&apiValue)

		if scanErr != nil {
			utils.EmitUnsuccessfulResponse(w, 500, "Error while querying for API key")

			return ""
		}
	}

	defer queryResult.Close()

	if len(apiValue) == 0 {
		utils.EmitUnsuccessfulResponse(w, 404, "Error, API key wasn't found")

		return ""
	}

	return apiValue
}

func GetUserProjects(w http.ResponseWriter, rq *http.Request) {
	apiKey := getApiKey(w)

	if len(apiKey) == 0 {
		utils.EmitUnsuccessfulResponse(w, 404, "Error, API key wasn't found")

		return
	}

	ctx := context.Background()

	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: apiKey},
	)

	tc := oauth2.NewClient(ctx, ts)

	clientGhub := github.NewClient(tc)

	repoListingOptions := github.RepositoryListOptions{
		Visibility:  "public",
		Affiliation: "owner",
	}

	repos, _, reposErr := clientGhub.Repositories.List(ctx, "", &repoListingOptions)

	if reposErr != nil {
		utils.EmitUnsuccessfulResponse(w, 500, "Error while trying to fetch the user repos")

		return
	}

	regularProjects := []types.Project{}
	testableProjects := []types.TestableProject{}

	for _, currentRepo := range repos {
		baseProjectInfo := types.Project{
			Name:    *currentRepo.Name,
			RepoURL: *currentRepo.HTMLURL,
		}

		if *currentRepo.HasPages {
			baseTestableInfo := types.TestableProject{
				Project: &baseProjectInfo,
				TestURL: *currentRepo.Homepage,
			}

			testableProjects = append(testableProjects, baseTestableInfo)
		} else {
			regularProjects = append(regularProjects, baseProjectInfo)
		}
	}

	userPortfolio := types.ProjectsResume{
		RegularProjects:  regularProjects,
		TestableProjects: testableProjects,
	}

	utils.EmitSucessfulResponse(w, &userPortfolio)
}
