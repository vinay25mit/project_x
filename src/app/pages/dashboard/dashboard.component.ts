import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userRole: string | null = localStorage.getItem('role'); // Fetch user role from storage

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirect to login page
  }
}
