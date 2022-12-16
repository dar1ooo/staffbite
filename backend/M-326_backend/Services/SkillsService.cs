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

        /// <summary>
        /// save skills to db
        /// </summary>
        /// <param name="skills"></param>
        public void SaveSkills(List<TeacherSkills> skills)
        {
            MongoCRUD.ClearTable<TeacherSkillsMongoDb>(collection);
            //create new skills
            foreach (TeacherSkills sk in skills)
            {
                TeacherSkillsMongoDb skill = new TeacherSkillsMongoDb();
                skill.SkillTopic = sk.SkillTopic;
                skill.SkillLevels = sk.SkillLevels;
                MongoCRUD.InsertRecord<TeacherSkillsMongoDb>(collection, skill);
            }
        }
        /// <summary>
        /// get all skills
        /// </summary>
        /// <returns></returns>
        public List<TeacherSkills> GetAllSkills()
        {
            return MongoCRUD.LoadRecords<TeacherSkills>(collection);
        }

        /// <summary>
        /// get teacher skills from db
        /// </summary>
        /// <returns></returns>
        public List<TeacherSkills> GetSkills()
        {
            List<TeacherSkills> teacherSkills = new List<TeacherSkills>();
            List<TeacherSkillsMongoDb> skills = MongoCRUD.LoadRecords<TeacherSkillsMongoDb>(collection);
            //add to return list
            foreach (TeacherSkillsMongoDb sk in skills)
            {
                TeacherSkills teacherSkill = new TeacherSkills();
                teacherSkill.SkillTopic = sk.SkillTopic;
                teacherSkill.SkillLevels = sk.SkillLevels;
                teacherSkills.Add(teacherSkill);
            }

            return teacherSkills;
        }
    }
}