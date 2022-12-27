namespace business_logic.Models
{
    public class TeacherSkills
    {
        public string Id { get; set; }
        public string SkillTopic { get; set; }
        public List<SkillLevel> SkillLevels { get; set; } = new List<SkillLevel>();
    }
}