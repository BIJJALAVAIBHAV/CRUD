import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/employee-service.service';
import { Gender } from 'src/app/models/Gender.model';

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.css']
})
export class GendersComponent implements OnInit {

  Genders:Gender[] = [];
  constructor( private EmployeeService: EmployeeServiceService) { }

  ngOnInit() {
    this.EmployeeService.getAllGenders()
    .subscribe({
      next:(genders)=>{
        this.Genders = genders;
        console.log(genders)
      },error:(response)=>{
        console.log(response)
      }
    })
  }

}
