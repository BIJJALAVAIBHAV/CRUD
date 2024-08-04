using System.ComponentModel.DataAnnotations;

namespace EmployeeAPI.Models
{
    public class updateEmployeeDTO
    {
        [Required]
        [StringLength(20)]
        [RegularExpression(@"[a-zA-Z]*", ErrorMessage = "Only Characters are allowed")]
        public string EmpFirstName { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression(@"[a-zA-Z]*", ErrorMessage = "Only Characters are allowed")]
        public string EmpLastName { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Only digits are allowed")]

        public long EmpSalary { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Department { get; set; }
    }
}
