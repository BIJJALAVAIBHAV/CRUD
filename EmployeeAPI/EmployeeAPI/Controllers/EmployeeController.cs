using EmployeeAPI.Data;
using EmployeeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext _employeeDbContext;

        public EmployeeController(EmployeeDbContext employeeDbContext)
        {
            _employeeDbContext = employeeDbContext;
        }


        // Getting all the employees

        [HttpGet("all_employees")]
        public IActionResult GetAllEmployees()
        {
            var employees = _employeeDbContext.Employess
                .Select(e => new EmployeeDisplayDTO
                {
                    Id = e.Id,
                    EmpFirstName = e.EmpFirstName,
                    EmpLastName = e.EmpLastName,
                    EmpSalary = e.EmpSalary,
                    EmailAddress = e.EmailAddress,
                    Age = e.Age,
                    Gender = e.Gender.GenderName,
                    Department = e.Department.DepartmentName
                })
                .ToList();

            if (employees == null || employees.Count == 0)
            {
                return NotFound("Employees not found");
            }

            return Ok(employees);
        }

        // Get Employee By Id
        [HttpGet]
        [Route("get_employee/{id:int}")]
        public IActionResult GetEmployee(int id)
        {
            var employee = _employeeDbContext.Employess.Find(id);
            if(employee == null)
            {
                return NotFound("Employee not Found");
            }

            return Ok(employee);
        }

       
        // Add Employee
        [HttpPost("add_employee")]
        public IActionResult CreateEmployee(EmployeeDTO employeeDTO)
        {

            var gender = _employeeDbContext.Genders.FirstOrDefault(g => g.GenderName == employeeDTO.Gender);
            if (gender == null)
            {
                return NotFound("GenderName, Invalid Gender Name");
            }

            var department = _employeeDbContext.Departments.FirstOrDefault(d => d.DepartmentName == employeeDTO.Department);
            if (department == null)
            {
                return NotFound("DepartmentName, Invalid Department Name");
            }

            // Create a new Employee entity
            var newEmployee = new Employee
            {
                EmpFirstName = employeeDTO.EmpFirstName,
                EmpLastName = employeeDTO.EmpLastName,
                EmpSalary = employeeDTO.EmpSalary,
                EmailAddress = employeeDTO.EmailAddress,
                Age = employeeDTO.Age,
                GenderId = gender.Id, // Assign GenderId based on resolved gender entity
                DepartmentId = department.Id // Assign DepartmentId based on resolved department entity
            };

            _employeeDbContext.Employess.Add(newEmployee);
            _employeeDbContext.SaveChanges();
            return Ok(newEmployee);

        }

        //Update Employee
        [HttpPut("update_employee/{id}")]
        public IActionResult UpdateEmployee(int id, [FromBody] updateEmployeeDTO updateEmployee)
        {
            var employee = _employeeDbContext.Employess.FirstOrDefault(x => x.Id == id);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            var gender = _employeeDbContext.Genders.FirstOrDefault(g => g.GenderName == updateEmployee.Gender);
            if (gender == null)
            {
                return NotFound("Invalid Gender Name");
            }

            var department = _employeeDbContext.Departments.FirstOrDefault(d => d.DepartmentName == updateEmployee.Department);
            if (department == null)
            {
                return NotFound("Invalid Department Name");
            }

            employee.EmpFirstName = updateEmployee.EmpFirstName;
            employee.EmpLastName = updateEmployee.EmpLastName;
            employee.EmpSalary = updateEmployee.EmpSalary;
            employee.EmailAddress = updateEmployee.EmailAddress;
            employee.Age = updateEmployee.Age;
            employee.Gender = gender;
            employee.Department = department;

            _employeeDbContext.SaveChanges();

            return Ok("Employee updated successfully");
        }

        [HttpDelete]
        [Route("delete_employee/{id:int}")]
        public IActionResult DeleteEmployee([FromRoute] int id)
        {
            var employee = _employeeDbContext.Employess.Find(id);
            if (employee == null)
            {
                return NotFound("Employee Not Found");
            }
            _employeeDbContext.Employess.Remove(employee);
            _employeeDbContext.SaveChanges();
            return Ok("Employee has been Deleted Succesfully");

        }

        // Getting all genders
        [HttpGet("genders")]

        public IActionResult GetAllGenders()
        {
            var genders = _employeeDbContext.Genders.Select(
                g => new GenderDTO
                {
                    Id = g.Id,
                    GenderName = g.GenderName
                }
                )
                .ToList();
            if (genders == null)
            {
                return NotFound("No Data");
            }
            return Ok(genders);
        }


        // Get the each gender id
        [HttpGet]
        [Route("get_gender/{id:int}")]
        public IActionResult GetGender(int id)
        {
            var gender = _employeeDbContext.Genders.Find(id);
            if (gender == null)
            {
                return NotFound("Gender Not Found");
            }
            var Gendername = new GenderDTO
            {
                GenderName = gender.GenderName,
            };
            return Ok(Gendername);
        }


        // Add the gender 
        [HttpPost("add_gender")]
        public IActionResult AddGender(GenderDTO addGenderDto)
        {
            var newGender = new Gender
            {
                GenderName = addGenderDto.GenderName
            };

            _employeeDbContext.Genders.Add(newGender);
            _employeeDbContext.SaveChanges();

            return Ok(newGender);
        }


        // Edit the Gender
        [HttpPut]
        [Route("edit_gender/{id:int}")]
        public IActionResult EditGender(int id, [FromBody] GenderDTO genderDTO)
        {
            var gender = _employeeDbContext.Genders.FirstOrDefault(g => g.Id == id);
            if(gender == null)
            {
                return NotFound("Gender Not found with given name");
            }
            gender.GenderName = genderDTO.GenderName;
            _employeeDbContext.SaveChanges();
            return Ok(gender);
        }



        // Delete the Gender
        [HttpDelete("delete_gender")]
        public IActionResult deleteGender(int id) {
            var employee = _employeeDbContext.Genders.Find(id);
            if (employee == null) {
                return NotFound("Gender Not Found");
            }
            _employeeDbContext.Genders.Remove(employee);
            _employeeDbContext.SaveChanges();
            return Ok("Gender has been deleted successfully");
        }


        // Getting All Departments
        [HttpGet("departments")]
        public IActionResult GetAllDepartments()
        {
            var departments = _employeeDbContext.Departments.Select(d => new DepartmentsDTO
            {
                Id = d.Id,
                DepartmentName = d.DepartmentName
            });
            if (departments == null)
            {
                return NotFound("No Data found");
            }
            return Ok(departments);
        }

        // Get the Each Department Name
        [HttpGet]
        [Route("get_department/{id:int}")]
        public IActionResult GetDepartment(int id) {
            var department = _employeeDbContext.Departments.Find(id);
            var departmentName = new DepartmentDTO
            {
                DepartmentName = department.DepartmentName,
            };
            if (department == null)
            {
                return NotFound("Department Not Found");
            }
            return Ok(departmentName);
        }



        [HttpPost("add_department")]
        public IActionResult addDepartment(DepartmentDTO department)
        {
            var newDepartment = new Department
            {
                DepartmentName = department.DepartmentName
            };
            _employeeDbContext.Departments.Add(newDepartment);
            _employeeDbContext.SaveChanges();
            return Ok(newDepartment);
        }

        [HttpPut]
        [Route("edit_department/{id:int}")]
        public IActionResult edit_data(int id, [FromBody] DepartmentDTO dto)
        {
            var departmentData = _employeeDbContext.Departments.Find(id);

            if (departmentData == null)
            {
                return NotFound("Department Not Present");
            }
            departmentData.DepartmentName = dto.DepartmentName;
            _employeeDbContext.SaveChanges();
            return Ok(departmentData);
        }

        [HttpDelete]
        [Route("delete_department/{id:int}")]
        public IActionResult deleteDepartment(int id) {
            var departmentData = _employeeDbContext.Departments.Find(id);
            if (departmentData == null)
            {
                return NotFound("Department Not Found");
            }
            _employeeDbContext.Departments.Remove(departmentData);
            _employeeDbContext.SaveChanges();
            return Ok(departmentData);
            
        }
  
            


    }
}
