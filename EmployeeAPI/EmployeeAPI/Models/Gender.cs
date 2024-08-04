namespace EmployeeAPI.Models
{
    public class Gender
    {
        public int Id { get; set; }

        public string GenderName { get; set; }

        public ICollection<Gender> Genders { get; set; }
    }
}
