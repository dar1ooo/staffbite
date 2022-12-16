using business_logic.Models;

namespace business_logic.Interfaces
{
    public interface ISkillsService
    {
        public List<TeacherSkills> GetAllSkills();

        public void SaveSkills(List<TeacherSkills> skills);

        public List<TeacherSkills> GetSkills();
    }
}