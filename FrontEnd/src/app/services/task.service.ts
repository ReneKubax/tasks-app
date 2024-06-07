import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) { }

  private getUserEmail(): string {
    return localStorage.getItem('userEmail') || '';
  }

  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  getTask(id: string): Observable<Task> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers });
  }

  addTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    task.userEmail = this.getUserEmail(); // Asegúrate de que la tarea tenga el email del usuario
    return this.http.post<Task>(this.apiUrl, task, { headers });
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { headers });
  }

  deleteTask(id: string): Observable<void> {
    const headers = new HttpHeaders({ 'x-user-email': this.getUserEmail() });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
