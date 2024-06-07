import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
 * Logs in the user by making an HTTP GET request to the server to retrieve the user information based on the provided email.
 * If the user is found, it stores the email in the local storage and navigates to the '/tasks' route.
 * If the user is not found, it prompts the user to create a new user. If the user chooses to create a new user,
 * it makes an HTTP POST request to the server to create the user with the provided email.
 *
 * @return {void} This function does not return a value.
 */
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;

    this.http.get(`http://localhost:5000/api/users/${email}`).subscribe(
      (user) => {
        localStorage.setItem('userEmail', email); // Guarda el email en localStorage
        this.router.navigate(['/tasks']);
      },
      (error) => {
        if (error.status === 404) {
          if (confirm('User not found. Would you like to create a new user?')) {
            this.http.post('http://localhost:5000/api/users', { email }).subscribe(
              () => {
                localStorage.setItem('userEmail', email);
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
