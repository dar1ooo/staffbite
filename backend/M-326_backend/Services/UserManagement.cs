using business_logic.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace business_logic.Services
{
    public class UserManagement
    {
        private  MongoCRUD MongoCRUD { get; set; }

        private string Database { get; set; }

        public UserManagement()
        {
            MongoCRUD = new MongoCRUD("mongodb://localhost:27017", "UserDB");
            Database = "UserDB";

        }

        public void createUser (User user)
        {
            MongoCRUD.InsertRecord<User>(Database, user);
        }

        public void deleteUser (User user)
        {
            var deleteFilter = Builders<BsonDocument>.Filter.Eq("_id", user.UserId);
            MongoCRUD.DeleteRecord(Database, deleteFilter);
        }

        public async Task<IAsyncCursor<User>> authenticateUser (User user)
        {
            var arrayFilter = Builders<User>.Filter.Eq("username", user.Username)
            & Builders<User>.Filter.Eq("password", user.Password);
            return await MongoCRUD.FindRecord(Database, arrayFilter);
        }
    }
}
