using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EmployeeAPI.Models
{
    public class Employee
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression(@"[a-zA-Z]{20}", ErrorMessage = "Only Characters are allowed" )]
        public string EmpFirstName { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression(@"[a-zA-Z ]{20}", ErrorMessage = "Only Characters are allowed")]
        public string EmpLastName { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Only digits are allowed")]

        public long EmpSalary { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        [Required]
        [RegularExpression("[18-101]{1}", ErrorMessage ="Age should be greater than or equal to 18")]
        public int Age  { get; set; }


        [Required]
        public int GenderId { get; set; }

        [JsonIgnore]
        public Gender Gender { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [JsonIgnore]
        public Department Department { get; set; }


    }
}
