
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  // userForm = {
  //   email: '',
  //   password: ''
  // }
  errors: any = [];

  
  loginForm = this.formBuilder.group({
    loginEmail: ['', [Validators.required, Validators.email]],
    loginPassword: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")]]
  });
  
  
  constructor(private auth: AuthService,
    private router: Router, 
    private formBuilder: FormBuilder) { }

    onSubmit(): void {
      const { loginEmail, loginPassword} = this.loginForm.value;
      this.auth.login(loginEmail, loginPassword)
      .pipe(take(1)).subscribe({
        next: data => {
          if (data.token){
            window.localStorage.setItem('auth_tkn', data.token);
            this.router.navigate(['/home'], {queryParams: {loggedin: 'success'} });
          }
        },
        error: (errorResponse) => {
          this.errors.push(errorResponse);
        }
      });
    }
    
    ngOnInit(): void {}



  // onLoginForm(form: NgForm): void {
  //   console.log(form.value);
  //   console.log(this.userForm);
  //   this.errors = [];
  //   this.auth.login(this.userForm)
  //     .subscribe(
  //       {
  //         next: (token) => {
  //           this.router.navigate(['/home'], {queryParams: {loggedin: 'success'} });
  //         },
  //         error: (errorResponse) => {
  //           this.errors.push(errorResponse);
  //         }
  //     });
  // }

  // onLogin(): void {
    
  //   this.errors = [];
  //   this.auth.login(this.userForm)
  //     .subscribe(
  //       {
  //         next: (token) => {
  //           this.router.navigate(['/home'], {queryParams: {loggedin: 'success'} });
  //         },
  //         error: (errorResponse) => {
  //           this.errors.push(errorResponse);
  //         }
  //     });
  //   }
  
}
