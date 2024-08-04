import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/employee-service.service';
import { Department } from 'src/app/models/Department.model';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments : Department[] = []

  constructor(private EmployeeService : EmployeeServiceService) { }

  ngOnInit() {
    this.EmployeeService.getAllDepartments()
    .subscribe({
      next:(departments)=>{
        this.departments = departments;
        console.log(departments)
      },
      error:(repsonse)=>{
        console.log(repsonse)
      }
    })
  }

}
