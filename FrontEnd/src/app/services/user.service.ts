import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

export interface User {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

    /**
   * Retrieves a user from the API by their email address.
   *
   * @param {string} email - The email address of the user.
   * @return {Observable<User>} An observable that emits the user object if found.
   */
    getUser(email: string): Observable<User> {
      const headers = new HttpHeaders({ 'x-user-email': email });
      return this.http.get<User>(`${this.apiUrl}/${email}`, { headers });
    }

    /**
   * Adds a user to the API.
   *
   * @param {User} user - The user object to be added.
   * @return {Observable<User>} An observable that emits the added user.
   */
    addUser(user: User): Observable<User> {
      const headers = new HttpHeaders({ 'x-user-email': user.email });
      return this.http.post<User>(this.apiUrl, user, { headers });
    }
}
