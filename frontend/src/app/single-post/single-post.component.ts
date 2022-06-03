import { Component, Input, OnInit } from '@angular/core';
import { MessageModel } from '../models/message.model';
import { Message } from '../models/newMessage.model';
import { MessagesService } from '../services/messages.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  //propriété personnalisée
  @Input() message!: MessageModel;

  //nouvelle implémentation
  oneMessage$!: Observable<Message>;
  //----

  buttonText!: string;

  
  //injection du service pour liker un post
  constructor(private msg: MessagesService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.buttonText= "Group'aimer";
    const messageId = +this.route.snapshot.params['id'];
    this.oneMessage$ = this.msg.getMessageById(messageId);
  }

  onLike(messageId: number) {
    if (this.buttonText === "Group'aimer") {
      this.msg.likeMessageById(messageId, 'like').pipe(
        tap(() => {
          this.oneMessage$ = this.msg.getMessageById(messageId);
          this.buttonText = "Je n'aime plus";
        })
        ).subscribe();
      } else {
        this.msg.likeMessageById(messageId, 'unlike').pipe(
          tap(() => {
          this.oneMessage$ = this.msg.getMessageById(messageId);
          this.buttonText = "Group'aimer";
        })
      ).subscribe();
    }
  }
}
