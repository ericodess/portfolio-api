using Octokit;
using Projects.Types.DAO;

namespace Projects.Types.DTO
{
    public class TestableProjectsResponse
    {
        public List<TestableProject> TestableProjects { get; set; } = new();

        public void ProcessGithubRepositories(SearchRepositoryResult RepositorySearchResponse) {
            foreach(var UserRepo in RepositorySearchResponse.Items)
            {
                if (UserRepo.Homepage == null || UserRepo.Homepage.Trim() == "")
                {
                    continue;
                }

                TestableProject NewTestableProject = new();

                NewTestableProject.ProcessGithubRepository(UserRepo);

                TestableProjects.Add(NewTestableProject);
            }

           TestableProjects = TestableProjects.OrderBy(_ => _.Name).ToList();
        }
    }
}
