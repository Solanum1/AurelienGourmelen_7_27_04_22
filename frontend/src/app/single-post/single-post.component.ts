import { Component, Input, OnInit } from '@angular/core';
import { MessageModel } from '../models/message.model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  //propriété personnalisée
  @Input() message!: MessageModel;
  buttonText!: string;
  
  
  constructor() { }

  ngOnInit(): void {
    this.buttonText= "👍"
  }

  onLike() {
    if (this.buttonText === '👍') {
      this.message.likes++;
      this.buttonText = '👎';
    } else {
      this.message.likes--;
      this.buttonText = '👍';
    }
  }
}
