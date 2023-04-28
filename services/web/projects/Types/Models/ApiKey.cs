using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Projects.Types.Models
{
    public class ApiKey
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? RawId { get; set; }

        [BsonElement("id")]
        public string Id { get; set; } = null!;

        [BsonElement("value")]
        public string Value { get; set; } = null!;

        [BsonElement("origin")]
        public string Origin { get; set; } = null!;
    }
}
