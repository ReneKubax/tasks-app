import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  private apiUrl = environment.apiUrl + '/users';

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
   * Logs in the user by sending a GET request to the API endpoint with the user's email.
   * If the user is found, their email is stored in local storage and they are navigated to the tasks page.
   * If the user is not found, a confirmation dialog is displayed asking if they would like to create a new user.
   * If the user confirms, a POST request is sent to the API endpoint to create a new user with the provided email.
   * If the user is created successfully, their email is stored in local storage and they are navigated to the tasks page.
   * If an error occurs during the process, an alert is displayed with the error message.
   *
   * @return {void} This function does not return anything.
   */
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;

    this.http.get(`${this.apiUrl}/${email}`).subscribe(
      (user) => {
        localStorage.setItem('userEmail', email);
        this.router.navigate(['/tasks']);
      },
      (error) => {
        if (error.status === 404) {
          if (confirm('User not found. Would you like to create a new user?')) {
            this.http.post(this.apiUrl, { email }).subscribe(
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
