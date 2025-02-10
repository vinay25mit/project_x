import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  // { path: '', redirectTo: '/signup', pathMatch: 'full' }, 
  {path:'',component:HomeComponent},
  { path: 'login', component: LoginComponent },

  
  { path: 'create-profile', component: CreateProfileComponent },
// { path: 'job-seeker-dashboard', component: JobSeekerDashboardComponent },
// { path: 'employer-dashboard', component: EmployerDashboardComponent },
{path:'**',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
