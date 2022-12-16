using MongoDB.Bson.Serialization.Attributes;

namespace business_logic.Models
{
    public class TeacherSkillsMongoDb
    {
        [BsonId]
        public Guid Id { get; set; }
        public string SkillTopic { get; set; }
        public List<SkillLevelMongoDb> SkillLevels { get; set; } = new List<SkillLevelMongoDb>();
    }
}