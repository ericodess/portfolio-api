using Microsoft.AspNetCore.Mvc;
using Octokit;
using Projects.Services;
using Projects.Types.DTO;

namespace Projects.Controllers
{
    [ApiController]
    [Route("/projects/api/v1")]
    public class ProjectsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly ILogger<ProjectsController> _logger;

        private readonly ApiKeysService _apiKeysService;

        private readonly GitHubClient _client;

        public ProjectsController(IConfiguration configuration, ILogger<ProjectsController> logger, ApiKeysService apiKeysService)
        {
            _configuration = configuration;

            _logger = logger;

            _apiKeysService = apiKeysService;

            _client = new GitHubClient(new ProductHeaderValue("portfolio-projects"));
        }

        [HttpGet("")]
        public async Task<ActionResult<ResponseWrapper<AllProjectsResponse>>> GetAll()
        {
            ResponseWrapper<AllProjectsResponse> ProjectsResponse = new();

            try
            {
                if (_client.Credentials == null)
                {
                    var apiKey = await GetApiKey();

                    _client.Credentials = new Credentials(apiKey);
                }

                ProjectsResponse.WasSuccessful = true;
                ProjectsResponse.Result = new AllProjectsResponse();

                string TargetUser = _configuration.GetValue<string>("ProjectStatics:TargetUser");

                if (TargetUser == null)
                {
                    ProjectsResponse.WasSuccessful = false;
                    ProjectsResponse.Message = "TargetUser value not set";

                    return StatusCode(500, ProjectsResponse);
                }

                var request = new SearchRepositoriesRequest()
                {
                    User = TargetUser
                };

                var result = await _client.Search.SearchRepo(request);

                if (result == null)
                {
                    ProjectsResponse.WasSuccessful = false;
                    ProjectsResponse.Message = "Github user not found";

                    return NotFound(ProjectsResponse);
                }

                ProjectsResponse.Result.ProcessGithubRepositories(result);

                return Ok(ProjectsResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                ProjectsResponse.WasSuccessful = false;
                ProjectsResponse.Message = ex.Message;

                return StatusCode(500, ProjectsResponse);
            }
        }

        
        [HttpGet("regular")]
        public async Task<ActionResult<ResponseWrapper<RegularProjectsResponse>>> GetRegularProjects()
        {
            ResponseWrapper<RegularProjectsResponse> ProjectsResponse = new();

            try
            {
                if (_client.Credentials == null)
                {
                    var apiKey = await GetApiKey();

                    _client.Credentials = new Credentials(apiKey);
                }

                ProjectsResponse.WasSuccessful = true;
                ProjectsResponse.Result = new RegularProjectsResponse();

                string TargetUser = _configuration.GetValue<string>("ProjectStatics:TargetUser");

                if (TargetUser == null)
                {
                    ProjectsResponse.WasSuccessful = false;
                    ProjectsResponse.Message = "TargetUser value not set";

                    return StatusCode(500, ProjectsResponse);
                }

                var request = new SearchRepositoriesRequest()
                {
                    User = TargetUser
                };

                var result = await _client.Search.SearchRepo(request);

                if (result == null)
                {
                    ProjectsResponse.WasSuccessful = false;
                    ProjectsResponse.Message = "Github user not found";

                    return NotFound(ProjectsResponse);
                }

                ProjectsResponse.Result.ProcessGithubRepositories(result);

                return Ok(ProjectsResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                ProjectsResponse.WasSuccessful = false;
                ProjectsResponse.Message = ex.Message;

                return StatusCode(500, ProjectsResponse);
            }
        }

        [HttpGet("testable")]
        public async Task<ActionResult<ResponseWrapper<TestableProjectsResponse>>> GetTestableProjects()
        {
            ResponseWrapper<TestableProjectsResponse> ProjectsResponse = new();

            try
            {
                if (_client.Credentials == null)
                {
                    var apiKey = await GetApiKey();

                    _client.Credentials = new Credentials(apiKey);
                }

                ProjectsResponse.WasSuccessful = true;
                ProjectsResponse.Result = new TestableProjectsResponse();

                string TargetUser = _configuration.GetValue<string>("ProjectStatics:TargetUser");

                if (TargetUser == null)
                {
                    ProjectsResponse.WasSuccessful = false;
                    ProjectsResponse.Message = "TargetUser value not set";

                    return StatusCode(500, ProjectsResponse);
                }

                var request = new SearchRepositoriesRequest()
                {
                    User = TargetUser
                };

                var result = await _client.Search.SearchRepo(request);

                if (result == null)
                {
                    ProjectsResponse.WasSuccessful = false;
                    ProjectsResponse.Message = "Github user not found";

                    return NotFound(ProjectsResponse);
                }

                ProjectsResponse.Result.ProcessGithubRepositories(result);

                return Ok(ProjectsResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                ProjectsResponse.WasSuccessful = false;
                ProjectsResponse.Message = ex.Message;

                return StatusCode(500, ProjectsResponse);
            }
        }

        private async Task<string> GetApiKey()
        {
            string ApiId = _configuration.GetValue<string>("ProjectStatics:ApiId");

            if (ApiId == null || ApiId.Trim() == "")
            {
                throw new Exception("ApiKey value not set");
            }

            var apiKey = await _apiKeysService.GetByIdAsync(ApiId);

            if (apiKey == null)
            {
                throw new Exception("ApiKey not found");
            }

            return apiKey.Value;
        }
    }
}