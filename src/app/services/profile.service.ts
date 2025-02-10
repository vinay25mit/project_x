import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/v1/profile';

  constructor(private http: HttpClient) {}

  createJobSeekerProfile(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/job-seeker`, data);
  }

  createEmployerProfile(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employer`, data);
  }
}
