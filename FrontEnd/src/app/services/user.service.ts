import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) { }

    /**
   * Retrieves a user from the API by their email address.
   *
   * @param {string} email - The email address of the user.
   * @return {Observable<User>} An observable that emits the user object if found.
   */
  getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${email}`);
  }

    /**
   * Adds a user to the API.
   *
   * @param {User} user - The user object to be added.
   * @return {Observable<User>} An observable that emits the added user.
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
