import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { JobMatchesComponent } from './components/job-matches/job-matches.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    CreateProfileComponent,
    DashboardComponent,
    ProfileComponent,
    AppliedJobsComponent,
    JobMatchesComponent,
    EditProfileComponent,
    CreateJobComponent,
    ViewApplicationsComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
