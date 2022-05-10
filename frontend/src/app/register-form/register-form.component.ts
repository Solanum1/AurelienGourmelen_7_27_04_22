import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  username: string;
  email: string;
  password: string;

  constructor() {
    this.username = "";
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }
  test(): void {
    alert(this.username);
  }
}
