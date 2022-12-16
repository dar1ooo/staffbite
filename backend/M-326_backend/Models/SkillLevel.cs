namespace business_logic.Models
{
    public class SkillLevel
    {
        public List<SubSkill> SubSkills { get; set; } = new List<SubSkill>();
    }

    public class SkillLevelMongoDb
    {
        public List<SubSkillMongoDb> SubSkills { get; set; } = new List<SubSkillMongoDb>();
    }
}