import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.http.get(`http://localhost:5000/api/users/${this.email}`).subscribe(
      (user) => {
        this.router.navigate(['/tasks']);
      },
      (error) => {
        if (error.status === 404) {
          if (confirm('User not found. Would you like to create a new user?')) {
            this.http.post('http://localhost:5000/api/users', { email: this.email }).subscribe(
              () => {
                this.router.navigate(['/tasks']);
              }
            );
          }
        } else {
          alert('An error occurred');
        }
      }
    );
  }
}
