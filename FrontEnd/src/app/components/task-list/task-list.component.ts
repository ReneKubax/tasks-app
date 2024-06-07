import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

    /**
   * Loads the tasks from the task service and filters them based on the user email.
   *
   * @return {void} This function does not return a value.
   */
  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.filter(task => task.userEmail === this.getUserEmail());
    });
  }

    /**
   * Deletes a task from the task list.
   *
   * @param {string} taskId - The ID of the task to be deleted.
   * @return {void} This function does not return a value.
   */
  deleteTask(taskId?: string): void {
    if (taskId) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.loadTasks();
      });
    }
  }

    /**
   * Toggles the completion status of a task and updates it in the task service.
   *
   * @param {Task} task - The task to toggle the completion status for.
   * @return {void} This function does not return a value.
   */
  toggleComplete(task: Task): void {
    if (task.id) {
      task.completed = !task.completed;
      this.taskService.updateTask(task.id, task).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  /**
 * Navigates to the edit page for a specific task.
 *
 * @param {string} taskId - The ID of the task to be edited.
 * @return {void} This function does not return a value.
 */
  editTask(taskId?: string): void {
    if (taskId) {
      this.router.navigate(['/edit', taskId]);
    }
  }

  /**
 * Retrieves the user's email from the local storage.
 *
 * @return {string} The user's email or an empty string if not found.
 */
  private getUserEmail(): string {
    return localStorage.getItem('userEmail') || '';
  }
}
