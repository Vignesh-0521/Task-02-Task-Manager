import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService :AuthService){}
  title = 'Task-Manager';

  getUsername(): string {   //method to store the current user and returns it
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.username || 'User';
  }
}
