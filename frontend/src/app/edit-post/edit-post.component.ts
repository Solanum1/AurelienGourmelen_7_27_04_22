import { Component, OnInit } from '@angular/core';
import { Message } from '../models/newMessage.model';
import { MessagesService } from'../services/messages.service';
import { Observable, map, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  message$!: Observable<Message>;
  userId!: string;

  constructor(private msg: MessagesService, 
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.message$ = this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.msg.getMessageById(id)),
    )
  }
}
