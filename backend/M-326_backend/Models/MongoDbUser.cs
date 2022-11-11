﻿using MongoDB.Bson.Serialization.Attributes;

namespace business_logic.Models
{
    public class MongoDbUser
    {
        [BsonId]
        public Guid Id { get; set; }

        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public UserRole UserRole { get; set; }
        public List<TeacherSkills> TeacherSkills { get; set; } = new List<TeacherSkills>();
    }
}