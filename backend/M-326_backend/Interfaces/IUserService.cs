using business_logic.Models;

namespace business_logic.Interfaces
{
    public interface IUserService
    {
        public void CreateUser(User user);

        public List<string> GetTakenUsernames();

        public List<Teacher> GetAllTeachers();
    }
}