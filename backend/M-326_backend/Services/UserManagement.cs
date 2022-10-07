using business_logic.Models;
using MongoDB.Driver;

namespace business_logic.Services
{
    public class UserManagement
    {
        private  MongoCRUD MongoCRUD { get; set; }

        public UserManagement()
        {
            MongoCRUD = new MongoCRUD("mongodb://localhost:27017", "UserDB");
        }

        public void createUser (User user)
        {
            MongoCRUD.InsertRecord<User>("UserDB", user);
        }
    }
}
