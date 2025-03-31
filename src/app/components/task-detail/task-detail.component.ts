import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;
  taskId: string = '';

  constructor(    //injecting these services
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';   //gets id from the url
    this.loadTask();
  }

  loadTask(): void {    //method to load taks
    if (this.taskId) {
      this.task = this.taskService.getTask(this.taskId);
      if (!this.task) {
        this.router.navigate(['/tasks']); // redirects if task not found
      }
    }
  }

  editTask(): void {    //to edit tasks
    this.router.navigate(['/task-form', this.taskId]);
  }

  deleteTask(): void {    //to delete tasks
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.taskId);
      this.router.navigate(['/tasks']);
    }
  }

  goBack(): void {    //to go back
    this.router.navigate(['/tasks']);
  }
  formatDate(dateString: string): string {    //formats date to local date
    return new Date(dateString).toLocaleDateString();
  }
}