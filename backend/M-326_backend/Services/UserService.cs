using business_logic.Interfaces;
using business_logic.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace business_logic.Services
{
    public class UserService : IUserService
    {
        private MongoCRUD MongoCRUD { get; set; }
        private string collection { get; set; }

        public UserService()
        {
            MongoCRUD = new MongoCRUD("mongodb://localhost:27017", "staffbite");
            collection = "Users";
        }

        public void CreateUser(User user)
        {
            List<TeacherSkills> teacherSkills = new List<TeacherSkills>();
            List<TeacherSkillsMongoDb> skills = MongoCRUD.LoadRecords<TeacherSkillsMongoDb>("Skills");

            foreach (TeacherSkillsMongoDb sk in skills)
            {
                TeacherSkills teacherSkill = new TeacherSkills();
                teacherSkill.SkillTopic = sk.SkillTopic;
                teacherSkill.Skills = sk.Skills;
                teacherSkills.Add(teacherSkill);
            }

            user.TeacherSkills = teacherSkills;

            MongoCRUD.InsertRecord<User>(collection, user);
        }

        public void deleteUser(User user)
        {
            var deleteFilter = Builders<BsonDocument>.Filter.Eq("_id", user.Id);
            MongoCRUD.DeleteRecord(collection, deleteFilter);
        }

        public async Task<IAsyncCursor<User>> authenticateUser(User user)
        {
            var arrayFilter = Builders<User>.Filter.Eq("username", user.Username)
            & Builders<User>.Filter.Eq("password", user.Password);
            return await MongoCRUD.FindRecord<User>(collection, arrayFilter);
        }

        public List<string> GetTakenUsernames()
        {
            List<User> users = MongoCRUD.LoadRecords<User>("Users");
            return users.Select(x => x.Username).ToList();
        }

        public List<Teacher> GetAllTeachers()
        {
            List<User> users = MongoCRUD.LoadRecords<User>("Users");
            List<Teacher> teachers = new List<Teacher>();
            foreach (User user in users)
            {
                teachers.Add(new Teacher()
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    UserRole = user.UserRole,
                    TeacherSkills = user.TeacherSkills
                });
            }

            return teachers;
        }
    }
}