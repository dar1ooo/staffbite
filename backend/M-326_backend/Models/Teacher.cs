using MongoDB.Bson.Serialization.Attributes;

namespace business_logic.Models
{
    public class Teacher
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public UserRole UserRole { get; set; }
        public List<TeacherSkills> TeacherSkills { get; set; }
    }
}