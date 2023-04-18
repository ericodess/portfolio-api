using Projects.Types.DAO;

namespace Projects.Types.DTO
{
    public class ProjectResponse
    {
        public List<Project> RegularProjects { get; set; } = new();
        public List<TestableProject> TeststableProjects { get; set; } = new();
    }
}
