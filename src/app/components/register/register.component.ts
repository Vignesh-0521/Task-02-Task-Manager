// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;    //creating registration form
  errorMessage: string = '';
  successMessage: string = '';

  constructor(    //injecting dependencies
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({   //registartion form fields and validation 
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {   //password and confirm password matching
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {    //on submitting in registration form , on success routes to login else shows user already exists
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      if (this.authService.register(username, password)) {
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.errorMessage = 'Username already exists';
        this.successMessage = '';
      }
    }
  }
  //methods to get username, password and confirm password
  get username() { return this.registerForm.get('username'); }    
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}