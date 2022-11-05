using business_logic.Interfaces;
using business_logic.Models;

namespace business_logic.Services
{
    public class SkillsService : ISkillsService
    {
        private MongoCRUD MongoCRUD { get; set; }
        private string collection { get; set; }

        public SkillsService()
        {
            MongoCRUD = new MongoCRUD("mongodb://localhost:27017", "staffbite");
            collection = "Skills";
        }

        public void SaveSkills(List<TeacherSkills> skills)
        {
            MongoCRUD.ClearTable<TeacherSkillsMongoDb>(collection);

            foreach (TeacherSkills sk in skills)
            {
                TeacherSkillsMongoDb skill = new TeacherSkillsMongoDb();
                skill.SkillTopic = sk.SkillTopic;
                skill.Skills = sk.Skills;
                MongoCRUD.InsertRecord<TeacherSkillsMongoDb>(collection, skill);
            }
        }

        public List<TeacherSkills> GetAllSkills()
        {
            return MongoCRUD.LoadRecords<TeacherSkills>(collection);
        }

        public List<TeacherSkills> GetSkills()
        {
            List<TeacherSkills> teacherSkills = new List<TeacherSkills>();
            List<TeacherSkillsMongoDb> skills = MongoCRUD.LoadRecords<TeacherSkillsMongoDb>(collection);

            foreach (TeacherSkillsMongoDb sk in skills)
            {
                TeacherSkills teacherSkill = new TeacherSkills();
                teacherSkill.SkillTopic = sk.SkillTopic;
                teacherSkill.Skills = sk.Skills;
                teacherSkills.Add(teacherSkill);
            }

            return teacherSkills;
        }
    }
}