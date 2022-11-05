using MongoDB.Bson.Serialization.Attributes;

namespace business_logic.Models
{
    public class TeacherSkills
    {
        public string SkillTopic { get; set; }
        public List<Skill> Skills { get; set; } = new List<Skill>();
    }

    public class TeacherSkillsMongoDb
    {
        [BsonId]
        public Guid Id { get; set; }
        public string SkillTopic { get; set; }
        public List<Skill> Skills { get; set; } = new List<Skill>();
    }
}