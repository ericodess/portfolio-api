using Octokit;

namespace Projects.Types.DAO
{
    public class Project
    {
        public string Name { get; set; } = "";
        public string RepoURL { get; set; } = "";

        public void ProcessGithubRepository(Repository repository)
        {
            this.Name = repository.Name;
            this.RepoURL = repository.HtmlUrl;
        }
    }
}
