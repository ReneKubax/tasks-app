import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      completed: [false]
    });
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.task.id = taskId || '';
    if (taskId) {
      this.isEdit = true;
      this.taskService.getTask(taskId).subscribe((task) => {
        this.task = task;
        this.task.id = taskId;
        this.taskForm.patchValue(this.task); // Sincroniza el formulario con los datos de la tarea
      });
    }
  }
  /**
   * Navigates back to the '/tasks' route.
   *
   * @return {void} This function does not return anything.
   */
  goBack(): void {
    this.router.navigate(['/tasks']);
  }

    /**
   * Saves the task by updating the task model with the form values and either
   * updating the task if it is in edit mode or adding a new task if it is not.
   *
   * @return {void} This function does not return anything.
   */
  saveTask(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.task = { ...this.task, ...this.taskForm.value }; // Actualiza el modelo de la tarea con los valores del formulario

    if (this.isEdit && this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      const { id, ...taskWithoutId } = this.task;
      this.taskService.addTask(taskWithoutId as Task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
