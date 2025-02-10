// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';
// import { HttpHeaders } from '@angular/common/http';
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   createEProfile(requestData: any, token: string) {
//     throw new Error('Method not implemented.');
//   }
//   private apiUrl = 'http://localhost:3000/api/v1/auth';
//   private apiUrl1='http://localhost:3000/api/v1/'

//   constructor(private http: HttpClient, private router: Router) {}

//   // Signup method
//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/signup`, userData);
//   }

//   // Login method with explicit email and password
//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, { email, password });
//   }
//   createProfile(formData: FormData, token: string): Observable<any> {
//     return this.http.post(`${this.apiUrl1}/profiles`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }
//   // Save token after login
//   saveToken(token: string): void {
//     localStorage.setItem('token', token);
//   }

//   // Check if user is authenticated
//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   // Get token from local storage
//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   // Get user details from token
//   getUserDetails(): { id: string; role: string } | null {
//     const token = this.getToken();
//     if (!token) return null;

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return { id: payload.id, role: payload.role };
//     } catch (e) {
//       return null;
//     }
//   }

//   // Get user role
//   getUserRole(): string | null {
//     const userDetails = this.getUserDetails();
//     return userDetails ? userDetails.role : null;
//   }

//   // Logout
//   logout(): void {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']); // Redirect to login page on logout
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/auth';
  private apiUrlJobSeeker = 'http://localhost:3000/api/v1/profiles';
  private apiUrlEmployer = 'http://localhost:3000/api/v1/employers/profiles'; // ✅ Employer Profile Route

  constructor(private http: HttpClient, private router: Router) {}

  // Signup method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Create Profile for Job Seeker
  createProfile(formData: FormData, token: string): Observable<any> {
    return this.http.post(this.apiUrlJobSeeker, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ✅ Create Profile for Employer
  createEProfile(requestData: any, token: string): Observable<any> {
    return this.http.post(this.apiUrlEmployer, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Save token after login
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get user details from token
  getUserDetails(): { id: string; role: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { id: payload.id, role: payload.role };
    } catch (e) {
      return null;
    }
  }

  // Get user role
  getUserRole(): string | null {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.role : null;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirect to login page on logout
  }
}
