using business_logic.Interfaces;
using business_logic.Models;
using Microsoft.AspNetCore.Mvc;

namespace business_logic.TestClasses
{
    public class UserServiceFake : IUserService
    {

        private readonly List<User> _user;
        public UserServiceFake()
        {
            _user = new List<User>()
            {
                new User() { Id = "id1", Email= "petermeier1@gibz.ch", Username = "pmeier1", UserRole = UserRole.Teacher},
                new User() { Id = "id2", Email= "petermeier2@gibz.ch", Username = "pmeier2", UserRole = UserRole.Teacher},
                new User() { Id = "id3", Email= "petermeier3@gibz.ch", Username = "pmeier3", UserRole = UserRole.Teacher},
                new User() { Id = "id4", Email= "chef1@gibz.ch", Username = "chef1", UserRole = UserRole.Admin},
            };
        }
        public User AuthenticateUser(UserLogin user)
        {
            return _user.Where(a => a.Username == user.Username)
          .FirstOrDefault();

        }

        public void CreateUser(MongoDbUser user)
        {
            User user1 = new User() { Id = user.Id.ToString(), Email = user.Email, Username = user.Username, UserRole = user.UserRole };
            _user.Add(user1);
        }

        public void DeleteUser(User user)
        {
            var existing = _user.First(a => a.Id == user.Id);
            _user.Remove(existing);
        }

        public List<User> GetAllTeachers()
        {
            List<User> teachers = new List<User>();
            foreach (User user in _user)
            {
                if (user.UserRole == UserRole.Teacher)
                {
                    teachers.Add(user);
                }         
            }
            return teachers;
        }

        public List<string> GetTakenUsernames()
        {
            return _user.Select(x => x.Username).ToList();
        }

        public string HashPassword(string password)
        {
            return "pw";
        }

        public void UpdateUser(User user)
        {
          
            for (int i = 0; i < _user.Count; i++)
            {
                if (_user[i].Id == user.Id)
                    _user[i] = user;
            }
        }

        public bool VerifyHashedPassword(string hashedPassword, string password)
        {
            return true;
        }
    }
}
