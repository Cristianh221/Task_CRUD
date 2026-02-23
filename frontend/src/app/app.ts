import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './services/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  tasks: Task[] = [];

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    isCompleted: false,
    createdAt: null, // 🔥 corregido
    dueDate: null
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => console.error('Error al cargar tareas', err)
    });
  }

  addTask(): void {
    if (this.newTask.title.trim()) {

      if (!this.newTask.createdAt) {
        alert("Debes seleccionar una fecha y hora");
        return;
      }

      const taskToSave: Task = {
        ...this.newTask,
        createdAt: new Date(this.newTask.createdAt).toISOString(),
        dueDate: this.newTask.dueDate
          ? new Date(this.newTask.dueDate).toISOString()
          : null
      };

      if (this.newTask.id === 0) {
        this.taskService.createTask(taskToSave).subscribe(() => {
          this.resetForm();
          this.loadTasks();
        });
      } else {
        this.taskService.updateTask(taskToSave).subscribe(() => {
          this.resetForm();
          this.loadTasks();
        });
      }
    }
  }

  editTask(task: Task): void {
    this.newTask = {
      ...task,
      createdAt: task.createdAt
        ? this.formatDateForInput(task.createdAt)
        : null,
      dueDate: task.dueDate
        ? this.formatDateForInput(task.dueDate)
        : null
    };
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleComplete(task: Task): void {
    task.isCompleted = !task.isCompleted;
    this.taskService.updateTask(task).subscribe();
  }

  resetForm(): void {
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      isCompleted: false,
      createdAt: null,
      dueDate: null
    };
  }

  // 🔥 MÉTODO QUE FALTABA
  formatDateForInput(date: string): string {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

}