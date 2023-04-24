using Octokit;

namespace Projects.Types.DAO
{
    public class TestableProject : Project
    {
        public string TestURL { get; set; } = "";

        public new void ProcessGithubRepository(Repository repository)
        {
            this.RepoURL = repository.Name;
            this.RepoURL = repository.Url;
            this.TestURL = repository.Homepage;
        }
    }
}
