import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AddComponent } from './component/add/add.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './component/edit/edit.component';
import { ViewComponent } from './component/view/view.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'signup', component: SignupComponent },
  { path:'login', component: LoginComponent },
  {path:'add',component:AddComponent},
  {path:'view',component:ViewComponent},
  {path:'edit/:id',component:EditComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

