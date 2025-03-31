// task-list.component.ts (unchanged)
import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'actions'];
  tasks: Task[] = [];

  constructor(    //injecting services
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {   //method to load tasks
    this.tasks = this.taskService.getTasks();
  }

  viewTask(id: string): void {    //method to view tasks
    this.router.navigate(['/task', id]);
  }

  editTask(id: string): void {    //method to edit tasks
    this.router.navigate(['/task-form', id]);
  }

  deleteTask(id: string): void {    //method to delete tasks
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }

  addNewTask(): void {    //method to add new task
    this.router.navigate(['/task-form', 'new']);
  }

  goToDashboard(): void {   //method to route to dashboard
    this.router.navigate(['/dashboard']);
  }
}