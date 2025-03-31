import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  taskId: string = '';
  isEditMode: boolean = false;
  statusOptions: string[] = ['Pending', 'In-Progress', 'Completed']; // Added "In-Progress"
  minDate: Date = new Date();

  constructor(    //injecting services
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({   //creating form group anf validators
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(500)],
      status: ['Pending', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';   //gets id from the url
    this.isEditMode = this.taskId !== 'new';
    
    if (this.isEditMode) {
      this.loadTask();
    }
  }

  loadTask(): void {    //method to load the tasks
    const task = this.taskService.getTask(this.taskId);
    if (task) {
      this.taskForm.patchValue({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : ''
      });
    } else {
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit(): void {    //on submitting, if form is valid stroes the data
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.taskForm.value,
        id: this.isEditMode ? this.taskId : '',
        dueDate: this.taskForm.value.dueDate.toISOString()
      };

      if (this.isEditMode) {
        this.taskService.updateTask(task);
      } else {
        this.taskService.addTask(task);
      }

      this.router.navigate(['/tasks']);
    }
  }

  cancel(): void {  
    this.router.navigate(['/tasks']);
  }
  //methods to get title, description, status, and duedate
  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
  get status() { return this.taskForm.get('status'); }
  get dueDate() { return this.taskForm.get('dueDate'); }
}