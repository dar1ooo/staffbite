using MongoDB.Bson;
using MongoDB.Driver;

namespace business_logic.Services
{
    public class MongoCRUD
    {
        private readonly IMongoDatabase db;

        
        public MongoCRUD(string connectionString, string database)
        {
            var client = new MongoClient(connectionString);
            db = client.GetDatabase(database);
        }

        public void InsertRecord<T>(string table, T record)
        {
            var collection = db.GetCollection<T>(table);
            collection.InsertOne(record);
        }

        public void DeleteRecord<T>(string table, FilterDefinition<T> filter)
        {
            var collection = db.GetCollection<T>(table);
            collection.DeleteOne(filter);
        }

        public async Task<IAsyncCursor<T>> FindRecord<T>(string table, FilterDefinition<T> filter)
        {
            var collection = db.GetCollection<T>(table);
            var value = await collection.FindAsync<T>(filter);
            return value;
        }
    }
}
