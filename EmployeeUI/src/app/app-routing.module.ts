import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeLIstComponent } from './components/employee-list/employee-list.component';
import { AppComponent } from './app.component';
import { GendersComponent } from './components/genders/genders.component';
import { DepartmentsComponent } from './components/departments/departments.component';

const routes: Routes = [
  {path:"dataList", component:AppComponent},
  {path:"", component:EmployeeLIstComponent},
  {path:"genders", component:GendersComponent},
  {path:'departments', component:DepartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
