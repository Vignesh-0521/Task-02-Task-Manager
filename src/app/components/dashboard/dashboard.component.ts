import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];   //to store tasks
  totalTasks: number = 0;   //to store total number of tasks
  completedTasks: number = 0;   //to store number of completed tasks
  pendingTasks: number = 0;   //to store pending tasks
  inprogress:number=0;    //to store in-progress tasks
  username: string = '';

  constructor(    //injecting services
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // to getet current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.username = currentUser.username || 'User';

    // L\to load tasks and calculate statistics
    this.loadTaskStats();
  }

  loadTaskStats(): void {
    this.tasks = this.taskService.getTasks();   //gets tasks from taskservice
    this.totalTasks = this.tasks.length;    //total number of taks
    this.completedTasks = this.tasks.filter(task => task.status === 'Completed').length;    //completed tasks
    this.pendingTasks = this.tasks.filter(task => task.status === 'Pending').length;    //pending tasks
    this.inprogress = this.tasks.filter(task => task.status === 'In-Progress').length;    //in-progress tasks
  }
}