import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { Employee } from './models/Employee.model';
import { Gender } from './models/Gender.model';
import { Department } from './models/Department.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  

  private APIUrl:string = "https://localhost:7169/api/employee"; 
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl + "/all_employees")
  }

  getAllGenders():Observable<Gender[]>{
    return this.http.get<Gender[]>(this.APIUrl + "/genders")
  }
  getAllDepartments():Observable<Department[]>{
    return this.http.get<Department[]>(this.APIUrl + "/departments")
  }

  addEmployee(addEmployeeRequest: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.APIUrl}/add_employee`, addEmployeeRequest);
  }

  deleteEmployee(id: number): Observable<string> {
    return this.http.delete<string>(`${this.APIUrl}/delete_employee/${id}`, { responseType: 'text' as 'json'  });
  }

  updateEmployee(id: number, employee: any): Observable<string> {
    return this.http.put<string>(`${this.APIUrl}/update_employee/${id}`, employee, { responseType: 'text' as 'json' });
  }
  
  getEmployee(id:string): Observable<Employee>{
    return this.http.get<Employee>(this.APIUrl + "/api/employee/get_employee/"+id)
  }

  
  
}
