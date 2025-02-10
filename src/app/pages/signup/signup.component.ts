import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['job_seeker', Validators.required]  // Default value set
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.http.post('http://localhost:3000/api/v1/auth/signup', this.signupForm.value)
        .subscribe({
          next: (response: any) => {
            console.log("response after submit sign up",response,response.token);
            localStorage.setItem('token', response.token);
            this.router.navigate(['/create-profile']);  // Redirect after successful signup
          },
          error: (err) => {
            this.errorMessage = err.error.error || 'Signup failed. Try again.';
          }
        });
    }
  }
}
