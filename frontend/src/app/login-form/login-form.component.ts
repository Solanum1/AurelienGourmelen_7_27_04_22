import { Component, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  userForm = {
    email: '',
    password: ''
  }
  errors: any = [];


  constructor(private http: HttpClient,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  onLoginForm(form: NgForm): void {
    console.log(form.value);
    console.log(this.userForm);
  }

  onLogin(): void {
    this.errors = [];
    this.auth.login(this.userForm)
      .subscribe(
        {
          next: (token) => {
            this.router.navigate(['/list'], {queryParams: {loggedin: 'success'} });
          },
          error: (errorResponse) => {
            this.errors.push(errorResponse);
          }
      });
    }
  
}
