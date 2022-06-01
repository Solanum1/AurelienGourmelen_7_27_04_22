import { Component, OnInit } from '@angular/core';
import { MessageModel } from '../models/message.model';
import { MessagesService } from'../services/messages.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private msg: MessagesService) { 

  }

  myMessage!: MessageModel[];

  ngOnInit(): void {
    // this.myMessage = new MessageModel(
    //   'Test - codé en dur',
    //   'Mon premier message ici',
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
    //   0
    // );
    this.msg.getAllMessages().subscribe( (message) => {
      this.myMessage = message;
    } );
  }

}
