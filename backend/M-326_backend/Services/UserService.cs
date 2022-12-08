using business_logic.Interfaces;
using business_logic.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Security.Cryptography;

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
                teacherSkill.SkillLevels = sk.SkillLevels;
                teacherSkills.Add(teacherSkill);
            }

            user.TeacherSkills = teacherSkills;

            MongoCRUD.InsertRecord<MongoDbUser>(collection, user);
        }

        public void DeleteUser(User user)
        {
            var deleteFilter = Builders<BsonDocument>.Filter.Eq("_id", Guid.Parse(user.Id));
            MongoCRUD.DeleteRecord(collection, deleteFilter);
        }

        public User AuthenticateUser(UserLogin user)
        {
            var arrayFilter = Builders<MongoDbUser>.Filter.Eq("Username", user.Username);
            try
            {
                MongoDbUser foundUser = MongoCRUD.FindRecord<MongoDbUser>(collection, arrayFilter);

                if (VerifyHashedPassword(foundUser.Password, user.Password))
                {

                    return new User()
                    {
                        Id = foundUser.Id.ToString(),
                        Username = foundUser.Username,
                        Email = foundUser.Email,
                        UserRole = foundUser.UserRole,
                        TeacherSkills = foundUser.TeacherSkills,
                    };
                }
                throw new Exception();
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

            var update = Builders<MongoDbUser>.Update
                .Set(p => p.TeacherSkills, dbUser.TeacherSkills)
                .Set(p => p.Username, dbUser.Username)
                .Set(p => p.Email, dbUser.Email);

            MongoCRUD.UpsertRecord<MongoDbUser>("Users", dbUser.Id, update);
        }

        public string HashPassword(string password)
        {
            byte[] salt;
            byte[] buffer2;
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8))
            {
                salt = bytes.Salt;
                buffer2 = bytes.GetBytes(0x20);
            }
            byte[] dst = new byte[0x31];
            Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            return Convert.ToBase64String(dst);
        }

        public bool VerifyHashedPassword(string hashedPassword, string password)
        {
            byte[] buffer4;
            byte[] src = Convert.FromBase64String(hashedPassword);
            if ((src.Length != 0x31) || (src[0] != 0))
            {
                return false;
            }
            byte[] dst = new byte[0x10];
            Buffer.BlockCopy(src, 1, dst, 0, 0x10);
            byte[] buffer3 = new byte[0x20];
            Buffer.BlockCopy(src, 0x11, buffer3, 0, 0x20);
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, dst, 0x3e8))
            {
                buffer4 = bytes.GetBytes(0x20);
            }
            return buffer4.SequenceEqual(buffer3);
        }
    }
}