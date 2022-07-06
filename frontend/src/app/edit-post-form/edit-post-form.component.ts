import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Message } from '../models/newMessage.model';


@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.scss']
})
export class EditPostFormComponent implements OnInit {

  messageFormUpdate!: FormGroup;
  urlRegex!: RegExp;
  message$!: Observable<Message>;
  messageId!: number;
  oneMessage$!: Observable<Message>;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private msg: MessagesService) { }

  ngOnInit(): void {
    this.messageId = +this.route.snapshot.params['id'];
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.messageFormUpdate = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      attachment: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
    })
  }

  onModifyForm() {
      this.msg.editMessage(this.messageId, this.messageFormUpdate.value).pipe(
        tap(() => this.router.navigateByUrl('/home'))
      ).subscribe();
  }
  
}
