import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {    //method used for logging in to check and to set current user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {   //method to set username and password to local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.username === username)) {
      return false;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  logout(): void {    //logout method to remove current user
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {   //checks if user logged in
    return !!localStorage.getItem('currentUser');
  }
}