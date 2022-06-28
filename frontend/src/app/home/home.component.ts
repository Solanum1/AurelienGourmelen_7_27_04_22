import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/newMessage.model';
import { MessagesService } from'../services/messages.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allMessage$!: Observable<Message[]>

  constructor( private msg: MessagesService) {}

  ngOnInit(): void {
    this.allMessage$ = this.msg.getAllMessages();
  }

}
