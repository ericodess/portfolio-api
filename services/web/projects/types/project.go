package types

type Project struct {
	Name    string `json:"name"`
	RepoURL string `json:"repoURL"`
}

type TestableProject struct {
	*Project
	TestURL string `json:"testURL"`
}

type ProjectsResume struct {
	RegularProjects  []Project         `json:"regularProjects"`
	TestableProjects []TestableProject `json:"testableProjects"`
}
