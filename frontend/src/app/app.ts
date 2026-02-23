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
    isCompleted: false
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
      if (this.newTask.id === 0) {
        this.taskService.createTask(this.newTask).subscribe(() => {
          this.resetForm();
          this.loadTasks();
        });
      } else {
        this.taskService.updateTask(this.newTask).subscribe(() => {
          this.resetForm();
          this.loadTasks();
        });
      }
    }
  }
  editTask(task: Task): void {
    this.newTask = { ...task };
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
    this.newTask = { id: 0, title: '', description: '', isCompleted: false };
  }
}