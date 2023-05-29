using Octokit;

namespace Projects.Types.DAO
{
    public class TestableProject : Project
    {
        public string TestURL { get; set; } = "";

        public new void ProcessGithubRepository(Repository repository)
        {
            this.Name = repository.Name;
            this.RepoURL = repository.HtmlUrl;
            this.TestURL = repository.Homepage;
        }
    }
}
