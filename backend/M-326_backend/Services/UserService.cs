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

        public void CreateUser(MongoDbUser user)
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

            MongoCRUD.InsertRecord<MongoDbUser>(collection, user);
        }

        public void DeleteUser(MongoDbUser user)
        {
            var deleteFilter = Builders<BsonDocument>.Filter.Eq("_id", user.Id);
            MongoCRUD.DeleteRecord(collection, deleteFilter);
        }

        public User AuthenticateUser(UserLogin user)
        {
            var arrayFilter = Builders<MongoDbUser>.Filter.Eq("Username", user.Username)
            & Builders<MongoDbUser>.Filter.Eq("Password", user.Password);
            try
            {
                MongoDbUser foundUser = MongoCRUD.FindRecord<MongoDbUser>(collection, arrayFilter);
                return new User()
                {
                    Id = foundUser.Id.ToString(),
                    Username = foundUser.Username,
                    Email = foundUser.Email,
                    UserRole = foundUser.UserRole,
                    TeacherSkills = foundUser.TeacherSkills,
                };
            }
            catch
            {
                throw;
            }
        }

        public List<string> GetTakenUsernames()
        {
            List<MongoDbUser> users = MongoCRUD.LoadRecords<MongoDbUser>("Users");
            return users.Select(x => x.Username).ToList();
        }

        public List<User> GetAllTeachers()
        {
            List<MongoDbUser> users = MongoCRUD.LoadRecords<MongoDbUser>("Users");
            List<User> teachers = new List<User>();
            foreach (MongoDbUser user in users)
            {
                if (user.UserRole == UserRole.Teacher)
                {
                    teachers.Add(new User()
                    {
                        Id = user.Id.ToString(),
                        Username = user.Username,
                        Email = user.Email,
                        UserRole = user.UserRole,
                        TeacherSkills = user.TeacherSkills
                    });
                }
            }

            return teachers;
        }

        public void UpdateUser(User user)
        {
            MongoDbUser dbUser = new MongoDbUser()
            {
                Id = new Guid(user.Id),
                Username = user.Username,
                Email = user.Email,
                UserRole = user.UserRole,
                TeacherSkills = user.TeacherSkills
            };

            var update = Builders<MongoDbUser>.Update.Set(p => p.TeacherSkills, dbUser.TeacherSkills);

            MongoCRUD.UpsertRecord<MongoDbUser>("Users", dbUser.Id, update);
        }
    }
}