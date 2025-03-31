// Remains unchanged
import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-progress',
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.scss']
})
export class TaskProgressComponent implements OnInit {
  totalTasks: number = 0;
  completedTasks: number = 0;
  inProgressTasks: number = 0;
  pendingTasks: number = 0;
  completedPercentage: number = 0;
  inProgressPercentage: number = 0;
  pendingPercentage: number = 0;

  constructor(private taskService: TaskService) {}    //injecting services

  ngOnInit(): void {
    this.loadTaskProgress();
  }

  loadTaskProgress(): void {    //method to load taskprogress 
    const tasks: Task[] = this.taskService.getTasks();
    this.totalTasks = tasks.length;
    this.completedTasks = tasks.filter(task => task.status === 'Completed').length;
    this.inProgressTasks = tasks.filter(task => task.status === 'In-Progress').length;
    this.pendingTasks = tasks.filter(task => task.status === 'Pending').length;

    this.completedPercentage = this.totalTasks > 0 
      ? Math.round((this.completedTasks / this.totalTasks) * 100) 
      : 0;
    this.inProgressPercentage = this.totalTasks > 0 
      ? Math.round((this.inProgressTasks / this.totalTasks) * 100) 
      : 0;
    this.pendingPercentage = this.totalTasks > 0 
      ? Math.round((this.pendingTasks / this.totalTasks) * 100) 
      : 0;
  }
}