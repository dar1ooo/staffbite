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

        public T FindRecord<T>(string table, FilterDefinition<T> filter)
        {
            var collection = db.GetCollection<T>(table);
            try
            {
                var value = collection.Find<T>(filter).First();
                return value;
            }
            catch
            {
                throw;
            }
        }

        public List<T> LoadRecords<T>(string table)
        {
            var collection = db.GetCollection<T>(table);
            return collection.Find(new BsonDocument()).ToList();
        }

        public T LoadRecordById<T>(string table, Guid id)
        {
            var collection = db.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq("_id", id);

            return collection.Find(filter).First();
        }

        public void ClearTable<T>(string table)
        {
            db.DropCollection(table);
        }

        public void UpsertRecord<T>(string table, Guid id, UpdateDefinition<T> record)
        {
            var collection = db.GetCollection<T>(table);

            var filter = Builders<T>.Filter.Eq("_id", id);

            var documentBefore = collection.FindOneAndUpdate(filter, record, new FindOneAndUpdateOptions<T> { ReturnDocument = ReturnDocument.Before });

            if (documentBefore != null)
            {
                // The document already existed and was updated.
            }
            else
            {
                // The document did not exist and was inserted.
            }
        }
    }
}