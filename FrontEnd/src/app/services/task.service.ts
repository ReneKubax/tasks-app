import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

export interface Task {
  id?: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
  userEmail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) { }
  /**
   * Retrieves the user's email from the local storage.
   *
   * @return {string} The user's email or an empty string if not found.
   */
  private getUserEmail(): string {
    return localStorage.getItem('userEmail') || '';
  }

    /**
   * Retrieves a list of tasks from the API.
   *
   * @return {Observable<Task[]>} An observable that emits an array of Task objects.
   */
  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    return this.http.get<Task[]>(this.apiUrl, { headers });
  }
 /**
   * Retrieves a task from the API by its ID.
   *
   * @param {string} id - The ID of the task to retrieve.
   * @return {Observable<Task>} An observable that emits the task object.
   */
  getTask(id: string): Observable<Task> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers });
  }
   /**
 * Adds a task to the API.
 *
 * @param {Task} task - The task to be added.
 * @return {Observable<Task>} An observable that emits the added task.
 */
  addTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    task.userEmail = this.getUserEmail();
    return this.http.post<Task>(this.apiUrl, task, { headers });
  }
/**
 * Updates a task in the API.
 *
 * @param {string} id - The ID of the task to update.
 * @param {Partial<Task>} task - The updated task object.
 * @return {Observable<Task>} An observable that emits the updated task.
 */
  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { headers });
  }
  /**
   * Deletes a task from the API.
   *
   * @param {string} id - The ID of the task to be deleted.
   * @return {Observable<void>} An observable that emits void when the task is successfully deleted.
   */
  deleteTask(id: string): Observable<void> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
