import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/employee-service.service';
import { Employee } from 'src/app/models/Employee.model';
import { Gender } from 'src/app/models/Gender.model';
import { Department } from 'src/app/models/Department.model';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

  

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeLIstComponent implements OnInit {
  constructor(private EmployeeService: EmployeeServiceService, private router: Router, private fb: FormBuilder) { }
  addEmployeeRequest: Employee = {
    id: 0,
    EmpFirstName: '',
    EmpLastName: '',
    EmpSalary: 0,
    EmailAddress:'',
    Age:0,
    Gender: '',
    Department: ''
  }



  Employees: any[] = [];
  Genders: Gender[] = [];
  Departments: Department[] = [];
  searchText: any;
  errorMessage: string = '';
  route: ActivatedRoute;
  successMessage: string | null = null;
  deleteMessage: string | null = null;


  ngOnInit(): void {
    this.createEmployeeForm();
    // this.createEditEmployeeForm();
    this.getAllEmployees();
    this.getAllDepartments();
    this.getAllGenders();
  }

  // Getting all employees
  getAllEmployees(): void {
    this.EmployeeService.getAllEmployees()
      .pipe(
        catchError(error => {
          console.error('Error fetching employees:', error);
          this.errorMessage = 'Failed to load employees. Please try again later.';
          return of([]); // Return an empty array in case of error
        })
      )
      .subscribe({
        next: (employees) => {
          this.Employees = employees;
          // this.filteredEmployees = this.Employees;
          console.log('Employees loaded:', employees);
        },
        error: (error) => {
          console.error('Error in subscription:', error);
        },
        complete: () => {
          console.log('Employee fetching completed');
        }
      });
  }

  // getting all genders
  getAllGenders(): void {
    this.EmployeeService.getAllGenders()
      .subscribe({
        next: (Gender) => {
          console.log(Gender)
          this.Genders = Gender;
        },
        error: (response) => {
          console.log(response);

        }

      })
  }


  // Getting all departments
  getAllDepartments(): void {
    this.EmployeeService.getAllDepartments()
      .subscribe({
        next: (department) => {
          console.log(department);
          this.Departments = department;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }
  debugger;
  deleteEmployee(id: number, employeeName: string) {
    this.EmployeeService.deleteEmployee(id).subscribe({
      next: (response: any) => {
        console.log('Employee deleted successfully');
        this.getAllEmployees();
        
        // Check if the response is a string
        if (typeof response === 'string') {
          this.deleteMessage = response;
        } else {
          this.deleteMessage = `Employee ${employeeName} has been deleted successfully`;
        }
        
        setTimeout(() => this.deleteMessage = '', 8000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting employee:', error);
        
        // Check if the error has a 200 status and contains a text response
        if (error.status === 200 && error.error.text) {
          this.deleteMessage = error.error.text;
        } else {
          this.deleteMessage = 'An error occurred while deleting the employee';
        }
        
        setTimeout(() => this.deleteMessage = '', 8000);
      }
    });
  } 

  employeeForm: FormGroup;

  createEmployeeForm() {
    this.employeeForm = this.fb.group({
      empFirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      empLastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      empSalary: ['', Validators.required],
      emailAddress:['', Validators.required],
      age:['', Validators.required],
      genderId: ['', Validators.required], // Assuming genderId is used for selection
      departmentId: ['', Validators.required] // Assuming departmentId is used for selection
    })
  }

  
  onSubmit(event: Event) {
    event.preventDefault();  // Prevent the default form submission
    
    if (this.employeeForm.valid) {
      const newEmployee: Employee = {
        id: 0,
        EmpFirstName: this.employeeForm.get('empFirstName').value,
        EmpLastName: this.employeeForm.get('empLastName').value,
        EmpSalary: this.employeeForm.get('empSalary').value,
        EmailAddress:this.employeeForm.get('emailAddress').value,
        Age:this.employeeForm.get('age').value,
        Gender: this.Genders.find(g => g.id === +this.employeeForm.get('genderId').value).genderName,
        Department: this.Departments.find(d => d.id === +this.employeeForm.get('departmentId').value).departmentName
      };
      
      this.EmployeeService.addEmployee(newEmployee).subscribe({
        next: (employee) => {
          console.log('Employee added successfully', employee);
          this.getAllEmployees();
          this.employeeForm.reset();
  
          // Show success alert
      this.showAlert(`Employee ${newEmployee.EmpFirstName} ${newEmployee.EmpLastName} added successfully!`);
        },
        error: (error) => {
          console.error('Error adding employee', error);
        }
      });
    } else if (this.employeeForm.invalid) {
      Object.values(this.employeeForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  
  // Alert message when enployee has been added
  showAlert(message: string) {
    let alertElement = document.getElementById('AlertDiv') as HTMLDivElement;
  
    if (!alertElement) {
      // Create alert element if it doesn't exist
      alertElement = document.createElement('div');
      alertElement.id = 'AlertDiv';
      alertElement.className = 'alert alert-success col-6 mx-auto text-center'; // Adjust class names as needed
      // alertElement.role = 'alert';
      
      // Append the alert element to the correct container
      const container = document.querySelector('.col-md-12');
      if (container) {
        container.prepend(alertElement); // Prepend to ensure it appears at the top
      } else {
        document.body.appendChild(alertElement); // Fallback
      }
    }
  
    alertElement.textContent = message;
  
    // Remove the alert after a certain amount of time
    setTimeout(() => {
      if (alertElement) {
        alertElement.remove(); // Use remove() for cleaner removal
      }
    }, 8000); // Remove after 8 seconds
  } 
  
  // Alert Message When Employee is deleted
  deleteAlert(message:string){
    let alertElement = document.getElementById("deleteAlertDiv") as HTMLDivElement;
    if(!alertElement){
      alertElement = document.createElement('div');
      alertElement.id = "deleteAlertDiv";
      alertElement.className = "alert alert-danger col-6 mx-auto text-center";

      const container = document.querySelector('.col-md-12');
      if(container){
        container.prepend(alertElement);
      }
      else{
        document.body.appendChild(alertElement);
      }
    } 
    alertElement.textContent = message;

    setTimeout(()=>{
      if(alertElement){
        alertElement.remove();
      }
    }, 8000)
  }
  
  

  @ViewChild('editForm') editForm: NgForm;

  employeeDetail: Employee = {
    id: 0,
    EmpFirstName: '',
    EmpLastName: '',
    EmpSalary: 0,
    EmailAddress:'',
    Age:0,  
    Gender: '',
    Department: ''
  };

    // createEditEmployeeForm() {
    //   this.employeeForm = this.fb.group({
    //     empFirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    //     empLastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    //     empSalary: ['', Validators.required],
    //     genderId: ['', Validators.required],
    //     departmentId: ['', Validators.required]
    //   });
    // }

//   populateEditForm(employee: Employee) {
//   this.employeeForm.patchValue({
//     empFirstName: employee.EmpFirstName,
//     empLastName: employee.EmpLastName,
//     empSalary: employee.EmpSalary,
//     genderId: (this.Genders.find(g => g.genderName === employee.Gender) ).id,
//     departmentId: (this.Departments.find(d => d.departmentName === employee.Department)).id
//   });
// }


onUpdateSubmit() {
  if (this.editForm.valid) {
    console.log('Sending update request with data:', this.employeeDetail);

    this.EmployeeService.updateEmployee(this.employeeDetail.id, this.employeeDetail)
      .subscribe({
        next: (response) => {
          console.log('Employee updated successfully', response);
          this.getAllEmployees();
        },
        error: (error) => {
          console.error('Error updating employee', error);
          this.handleError(error);
        }
      });
  }
  
}
openEditModal(employee: Employee) {
  this.employeeDetail = { ...employee };
}

private handleError(error: any) {
  if (error.error) {
    console.log('Server error:', error.error);
    this.errorMessage = error.error;
  }
}

}

