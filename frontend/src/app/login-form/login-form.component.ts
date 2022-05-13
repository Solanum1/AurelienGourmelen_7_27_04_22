import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  userEmail!: string;
  userPassword!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onLoginForm(form: NgForm): void {
    console.log(form.value);
    
  }

}
