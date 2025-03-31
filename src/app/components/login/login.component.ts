// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;   //creating form group
  errorMessage: string = '';

  constructor(    //services injection
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({    //creating login form
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {    //on submitting in login page, if user found, routes to dashboard else shows user not found
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'User not found.';
        
      }
    }
  }
}