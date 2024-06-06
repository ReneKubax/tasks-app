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

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(taskId?: string): void {
    if (taskId) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  toggleComplete(task: Task): void {
    if (task.id) {
      task.completed = !task.completed;
      this.taskService.updateTask(task.id, task).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  editTask(taskId?: string): void {
    if (taskId) {
      this.router.navigate(['/edit', taskId]);
    }
  }
}
