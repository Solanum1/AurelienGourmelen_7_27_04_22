import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../models/newMessage.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  messageForm!: FormGroup;
  messagePreview$!: Observable<Message>;
  urlRegex!: RegExp;
  username!: string;

  
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router, 
              private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.messageForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      attachment: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      likes: [null]
    }, {
      updateOn: 'blur'
    });

    this.messagePreview$ = this.messageForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        likes: 0
      }))
    );
  }

  onSubmitForm() {
    let userId = this.authService.getUserId();
    console.log(userId);
    if (userId) {
      this.messagesService.addMessage(this.messageForm.value, userId).subscribe(()=> {
        window.location.reload();
      });
    }
  }

}
