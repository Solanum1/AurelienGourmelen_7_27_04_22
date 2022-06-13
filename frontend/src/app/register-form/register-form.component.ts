import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  passwordRegex!: RegExp;
  errors: any = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              //cette ligne génère un bug
              //private userService: User
              ) {
  }

  ngOnInit(): void {
    this.passwordRegex = /[0-9a-zA-Z]{6,30}/;
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
      username: [null, [Validators.required]]
    });
  }

  onSubmit(): void {
    this.errors = [];
    console.log(this.signupForm.value);
    this.auth.register(this.signupForm.value).pipe(
      //redirige vers page de connexion
      tap(() => this.router.navigateByUrl(''))
    )
    .subscribe();
  }

}
