using EmployeeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Data
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Employee> Employess { get; set; }

        public DbSet<Gender> Genders { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<EmployeeDisplayDTO> EmployeeDisplayDTOs { get; set; }

    }
}
