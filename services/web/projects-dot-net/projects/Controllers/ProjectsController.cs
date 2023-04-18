using Microsoft.AspNetCore.Mvc;
using Projects.Types.DTO;

namespace Projects.Controllers
{
    [ApiController]
    [Route("/api/v1/projects")]
    public class ProjectsController : ControllerBase
    {
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(ILogger<ProjectsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("")]
        public ProjectResponse GetAll()
        {
            return new ProjectResponse();
        }
    }
}