using Octokit;
using Projects.Types.DAO;

namespace Projects.Types.DTO
{
    public class RegularProjectsResponse
    {
        public List<Projects.Types.DAO.Project> RegularProjects { get; set; } = new();

        public void ProcessGithubRepositories(SearchRepositoryResult RepositorySearchResponse) {
            foreach(var UserRepo in RepositorySearchResponse.Items)
            {
                if (UserRepo.Homepage != null && UserRepo.Homepage.Trim() != "")
                {
                    continue;
                }

                Projects.Types.DAO.Project NewProject = new();

                NewProject.ProcessGithubRepository(UserRepo);

                RegularProjects.Add(NewProject);
            }

           RegularProjects = RegularProjects.OrderBy(_ => _.Name).ToList();
        }
    }
}
