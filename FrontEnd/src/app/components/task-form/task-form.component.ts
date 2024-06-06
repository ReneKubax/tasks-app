import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    createdAt: new Date().toISOString(),
    completed: false
  };
  isEdit = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.task.id = taskId || '';
    if (taskId) {
      this.isEdit = true;
      this.taskService.getTask(taskId).subscribe((task) => {
        this.task = task;
        this.task.id = taskId;
      });
    }
  }

  saveTask(): void {
    if (this.isEdit && this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      const { id, ...taskWithoutId } = this.task;
      this.taskService.addTask(taskWithoutId as Task).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
