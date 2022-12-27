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

        /// <summary>
        /// create user in db
        /// </summary>
        /// <param name="user"></param>
        public void CreateUser(MongoDbUser user)
        {
            //get given skills from db
            List<TeacherSkills> teacherSkills = new List<TeacherSkills>();
            List<TeacherSkillsMongoDb> skills = MongoCRUD.LoadRecords<TeacherSkillsMongoDb>("Skills");

            //iterate through skills and add to user
            foreach (TeacherSkillsMongoDb sk in skills)
            {
                TeacherSkills teacherSkill = new TeacherSkills();
                teacherSkill.SkillTopic = sk.SkillTopic;
                teacherSkill.Id = sk.Id.ToString();

                foreach (SkillLevelMongoDb skillLevelMongoDb in sk.SkillLevels)
                {
                    SkillLevel skillLevel = new SkillLevel();

                    foreach (SubSkillMongoDb subSkillMongoDb in skillLevelMongoDb.SubSkills)
                    {
                        SubSkill subSkill = new SubSkill();
                        subSkill.Id = subSkillMongoDb.Id.ToString();
                        subSkill.Description = subSkillMongoDb.Description;
                        subSkill.IsChecked = false;
                        subSkill.VideoUrl = subSkillMongoDb.VideoUrl;
                        subSkill.PdfUrl = subSkillMongoDb.PdfUrl;
                        subSkill.ShowPdf = subSkillMongoDb.ShowPdf;
                        subSkill.ShowVideo = subSkillMongoDb.ShowVideo;
                        skillLevel.SubSkills.Add(subSkill);
                    }

                    teacherSkill.SkillLevels.Add(skillLevel);
                }

                teacherSkills.Add(teacherSkill);
            }

            user.TeacherSkills = teacherSkills;
            //insert to db
            MongoCRUD.InsertRecord<MongoDbUser>(collection, user);
        }

        /// <summary>
        /// delete user in db
        /// </summary>
        /// <param name="user"></param>
        public void DeleteUser(User user)
        {
            var deleteFilter = Builders<BsonDocument>.Filter.Eq("_id", Guid.Parse(user.Id));
            MongoCRUD.DeleteRecord(collection, deleteFilter);
        }

        /// <summary>
        /// log in user in db
        /// </summary>
        /// <param name="user"></param>
        /// <returns>found user</returns>
        public User AuthenticateUser(UserLogin user)
        {
            //filter to find username
            var arrayFilter = Builders<MongoDbUser>.Filter.Eq("Username", user.Username);
            try
            {
                MongoDbUser foundUser = MongoCRUD.FindRecord<MongoDbUser>(collection, arrayFilter);

                //check if password hash is valid
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

        /// <summary>
        /// get taken usernames in db
        /// </summary>
        /// <returns>list with usernames</returns>
        public List<string> GetTakenUsernames()
        {
            List<MongoDbUser> users = MongoCRUD.LoadRecords<MongoDbUser>("Users");
            return users.Select(x => x.Username).ToList();
        }

        /// <summary>
        /// get all teachers from db
        /// </summary>
        /// <returns>list of users with role teacher</returns>
        public List<User> GetAllTeachers()
        {
            //get all users
            List<MongoDbUser> users = MongoCRUD.LoadRecords<MongoDbUser>("Users");
            List<User> teachers = new List<User>();
            foreach (MongoDbUser user in users)
            {
                //check for correct role
                if (user.UserRole == UserRole.Teacher)
                {
                    //add to return list
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

        /// <summary>
        /// update user in db
        /// </summary>
        /// <param name="user"></param>
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
            //filter to find which user to update
            var update = Builders<MongoDbUser>.Update
                .Set(p => p.TeacherSkills, dbUser.TeacherSkills)
                .Set(p => p.Username, dbUser.Username)
                .Set(p => p.Email, dbUser.Email);

            MongoCRUD.UpsertRecord<MongoDbUser>("Users", dbUser.Id, update);
        }

        /// <summary>
        /// hash a password
        /// </summary>
        /// <param name="password"></param>
        /// <returns>password hash</returns>
        public string HashPassword(string password)
        {
            //create salt for hash
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

        /// <summary>
        /// verify hash of password
        /// </summary>
        /// <param name="hashedPassword"></param>
        /// <param name="password"></param>
        /// <returns>true or false</returns>
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