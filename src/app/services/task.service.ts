import { Injectable } from '@angular/core';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string; // Will now include "In-Progress" as a possible value
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksKey = 'tasks';

  getTasks(): Task[] {    //method to get tasks from local storage
    return JSON.parse(localStorage.getItem(this.tasksKey) || '[]');
  }

  getTask(id: string): Task | undefined {   //method to get specific task based on id
    const tasks = this.getTasks();
    return tasks.find(task => task.id === id);
  }

  addTask(task: Task): void {   //method to add task
    const tasks = this.getTasks();
    task.id = Date.now().toString();
    tasks.push(task);
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  updateTask(updatedTask: Task): void {   //method to update task
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    }
  }

  deleteTask(id: string): void {    //method to delete task
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem(this.tasksKey, JSON.stringify(filteredTasks));
  }
}