namespace EmployeeAPI.Models
{
    public class Department
    {
        public int Id { get; set; }

        public string DepartmentName { get; set; }

        public ICollection<Department> Departments { get; set; }
    }
}
