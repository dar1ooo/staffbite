using MongoDB.Bson.Serialization.Attributes;

namespace business_logic.Models
{
    public class TeacherSkillsMongoDb
    {
        [BsonId]
        public Guid Id { get; set; }
        public string SkillTopic { get; set; }
        public List<SkillLevel> SkillLevels { get; set; } = new List<SkillLevel>();
    }
}