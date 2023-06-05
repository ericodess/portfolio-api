using Octokit;
using Projects.Types.DAO;

namespace Projects.Types.DTO
{
    public class AllProjectsResponse
    {
        public List<Projects.Types.DAO.Project> RegularProjects { get; set; } = new();
        public List<TestableProject> TestableProjects { get; set; } = new();

        public void ProcessGithubRepositories(SearchRepositoryResult RepositorySearchResponse) {
            foreach(var UserRepo in RepositorySearchResponse.Items)
            {
                if (UserRepo.Homepage != null && UserRepo.Homepage.Trim() != "")
                {
                    TestableProject NewTestableProject = new();

                    NewTestableProject.ProcessGithubRepository(UserRepo);

                    TestableProjects.Add(NewTestableProject);

                    continue;
                }

                Projects.Types.DAO.Project NewProject = new();

                NewProject.ProcessGithubRepository(UserRepo);

                RegularProjects.Add(NewProject);
            }

           RegularProjects = RegularProjects.OrderBy(_ => _.Name).ToList();
           TestableProjects = TestableProjects.OrderBy(_ => _.Name).ToList();
        }
    }
}
