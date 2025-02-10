// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'jobseeker' | 'employer';
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role: 'jobseeker' | 'employer';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'http://your-backend-api.com/auth'; // Replace with your actual API URL

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize currentUserSubject from localStorage
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Getter for current user value
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Login method
  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => this.handleAuthentication(user)),
      catchError(this.handleError)
    );
  }

  // Signup method
  signup(credentials: SignupCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, credentials).pipe(
      tap(user => this.handleAuthentication(user)),
      catchError(this.handleError)
    );
  }

  // Logout method
  logout(): void {
    // Call backend logout endpoint if needed
    this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      catchError(error => {
        console.warn('Logout backend call failed', error);
        return throwError(error);
      })
    ).subscribe();

    // Clear local storage and reset user subject
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  // Token refresh method
  refreshToken(): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/refresh-token`, {}).pipe(
      tap(user => this.handleAuthentication(user)),
      catchError(this.handleError)
    );
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const user = this.currentUserValue;
    return !!user && this.isTokenValid(user.token);
  }

  // Check if user has a specific role
  hasRole(role: 'jobseeker' | 'employer'): boolean {
    const user = this.currentUserValue;
    return !!user && user.role === role;
  }

  // Private method to handle successful authentication
  private handleAuthentication(user: User): void {
    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update current user subject
    this.currentUserSubject.next(user);

    // Set up token refresh mechanism
    this.setupTokenRefresh();
  }

  // Token validation method
  private isTokenValid(token: string): boolean {
    if (!token) return false;

    try {
      // Decode JWT token
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Check token expiration
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch (error) {
      return false;
    }
  }

  // Setup automatic token refresh
  private setupTokenRefresh(): void {
    const user = this.currentUserValue;
    if (user && user.token) {
      try {
        const payload = JSON.parse(atob(user.token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        // Refresh token 5 minutes before expiration
        if (timeUntilExpiration > 0) {
          setTimeout(() => {
            this.refreshToken().subscribe(
              () => console.log('Token refreshed'),
              error => {
                console.error('Token refresh failed', error);
                this.logout();
              }
            );
          }, timeUntilExpiration - (5 * 60 * 1000));
        }
      } catch (error) {
        console.error('Token parsing failed', error);
      }
    }
  }

  // Error handling method
  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid credentials';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          this.logout();
          break;
        case 403:
          errorMessage = 'Access denied';
          break;
        case 404:
          errorMessage = 'Service not found';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    // Log error for debugging
    console.error(errorMessage, error);

    // Return an observable with a user-facing error message
    return throwError(errorMessage);
  }
}