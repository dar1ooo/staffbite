using business_logic.Models;

namespace business_logic.Interfaces
{
    public interface IUserService
    {
        public void CreateUser(MongoDbUser user);
        public void DeleteUser(User user);
        public string HashPassword(string password);
        public bool VerifyHashedPassword(string hashedPassword, string password);

        public List<string> GetTakenUsernames();

        public List<User> GetAllTeachers();

        public User AuthenticateUser(UserLogin user);

        public void UpdateUser(User user);
    }
}