namespace business_logic.Models
{
    public class User
    {
        public string Id { get; set; }

        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public UserRole UserRole { get; set; }
        public List<TeacherSkills> TeacherSkills { get; set; } = new List<TeacherSkills>();
    }
}