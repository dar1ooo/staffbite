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
        /// <summary>
        /// crud to create record in mongodb
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="record"></param>
        public void InsertRecord<T>(string table, T record)
        {
            var collection = db.GetCollection<T>(table);
            collection.InsertOne(record);
        }
        /// <summary>
        /// crud to delete record in db
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="filter"></param>
        public void DeleteRecord<T>(string table, FilterDefinition<T> filter)
        {
            var collection = db.GetCollection<T>(table);
            collection.DeleteOne(filter);
        }
        /// <summary>
        /// crud to find record with given filter
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="filter"></param>
        /// <returns>record if found with filter</returns>
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
        /// <summary>
        /// crud to get all records
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <returns>list with found records</returns>
        public List<T> LoadRecords<T>(string table)
        {
            var collection = db.GetCollection<T>(table);
            return collection.Find(new BsonDocument()).ToList();
        }
        /// <summary>
        /// crud to get record by id
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="id"></param>
        /// <returns>found record</returns>
        public T LoadRecordById<T>(string table, Guid id)
        {
            var collection = db.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq("_id", id);

            return collection.Find(filter).First();
        }
        /// <summary>
        /// crud drop a db collection
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        public void ClearTable<T>(string table)
        {
            db.DropCollection(table);
        }

        /// <summary>
        /// crud to update a record
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="id"></param>
        /// <param name="record"></param>
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