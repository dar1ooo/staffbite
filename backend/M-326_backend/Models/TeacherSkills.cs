namespace business_logic.Models
{
    public class TeacherSkills
    {
        public string SkillTopic { get; set; }
        public List<SkillLevel> SkillLevels { get; set; } = new List<SkillLevel>();
    }
}