import { Component, OnInit } from '@angular/core';
import { Message } from '../models/newMessage.model';
import { MessagesService } from'../services/messages.service';
import { Observable, map, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  message$!: Observable<Message>;
  userId!: string;
  username!: string;

  constructor(private msg: MessagesService, 
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.message$ = this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.msg.getMessageById(id)),
    )
  }
}
