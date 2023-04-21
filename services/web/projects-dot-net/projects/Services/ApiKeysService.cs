using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Projects.Types.Models;

namespace Projects.Services
{
    public class ApiKeysService
    {
        private readonly IMongoCollection<ApiKey> _apiKeyCollection;

        public ApiKeysService(IOptions<ApiKeysDatabaseSettings> apiKeysDatabaseSettings)
        {
            var mongoClient = new MongoClient(apiKeysDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(apiKeysDatabaseSettings.Value.DatabaseName);

            _apiKeyCollection = mongoDatabase.GetCollection<ApiKey>(apiKeysDatabaseSettings.Value.CollectionName);
        }

        public async Task<List<ApiKey>> GetAllAsync() => await _apiKeyCollection.Find(_ => true).ToListAsync();

        public async Task<ApiKey?> GetByRawIdAsync(string RawId) => await _apiKeyCollection.Find(_ => _.RawId == RawId).FirstOrDefaultAsync();

        public async Task<ApiKey?> GetByIdAsync(string Id) => await _apiKeyCollection.Find(_ => _.Id == Id).FirstOrDefaultAsync();

        public async Task<List<ApiKey>> GetByOrigin(string Origin) => await _apiKeyCollection.Find(_ => _.Origin.ToUpper() == Origin.ToUpper()).ToListAsync();
    }
}
