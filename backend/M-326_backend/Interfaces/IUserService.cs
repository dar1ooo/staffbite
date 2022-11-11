using business_logic.Models;

namespace business_logic.Interfaces
{
    public interface IUserService
    {
        public void CreateUser(MongoDbUser user);

        public List<string> GetTakenUsernames();

        public List<User> GetAllTeachers();

        public User AuthenticateUser(UserLogin user);
    }
}