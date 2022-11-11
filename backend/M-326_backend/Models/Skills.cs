namespace business_logic.Models
{
    public class TeacherSkills
    {
        public string SkillTopic { get; set; }
        public List<Skill> Skills { get; set; } = new List<Skill>();
    }
}