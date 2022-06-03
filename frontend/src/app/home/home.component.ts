import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { Message } from '../models/newMessage.model';
import { MessagesService } from'../services/messages.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  //myMessage!: MessageModel[];

  //nouvelle implémentation pour récupérer les messages
  allMessage$!: Observable<Message[]>
  //----

  constructor( private messagesService: MessagesService) {}

  ngOnInit(): void {
    // this.messagesService.getAllMessages().subscribe( (message) => {
    //   this.myMessage = message;
    // } );
    this.allMessage$ = this.messagesService.getAllMessages();
  }


}
