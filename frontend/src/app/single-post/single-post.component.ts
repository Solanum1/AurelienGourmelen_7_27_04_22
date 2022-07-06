import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/newMessage.model';
import { MessagesService } from '../services/messages.service';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model'

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})

export class SinglePostComponent implements OnInit {
  @Input() message!: Message;
  @Input() user!: User | null;
  oneMessage$!: Observable<Message>;
  username!: string;
  buttonText!: string;
  errorMessage!: string;
  userId!: number | null;
  messageId!: number;
  likes!: number;
  isUserAdmin!: boolean;
  
  constructor(private msg: MessagesService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {}
    
    ngOnInit() {
      const messageId = +this.route.snapshot.params['id'];
      this.oneMessage$ = this.msg.getMessageById(messageId);
      this.username = this.authService.getUsername();
      this.userId = this.authService.getUserId();
      this.isUserAdmin = this.authService.isUserAdmin();
      this.buttonText= "J'aime";
      
    }
    
    onClickPost(id: number) {
      // this.router.navigate(['/home', id]);
      this.router.navigate([`/edit/${this.message.id}`])
    }

    onModify() {
      this.oneMessage$.pipe(
        take(1),
        tap(message => this.router.navigate([`/edit/${this.message.id}`]))
      ).subscribe();
    }
      
    onDelete(id: number){
      console.log(id);
      this.msg.deleteMessage(this.message.id).subscribe(()=> {
        this.router.navigate(['/home']).then(() => {
          window.location.reload()
        });
      });
    }
    
    onLike() {
      const userId = this.authService.getUserId();
      if(userId != null){
        if(this.isAlreadyLike()) {
          this.msg.unLikeMessage(this.message.id ).subscribe(
            () => {
              for (var i = 0; i<this.message.Likes.length; i++) {
                if(this.message.Likes[i].userId === this.authService.getUserId()) {
                  this.message.Likes.splice(i, 1);
                }
              }
            }
          );
        } else {
          this.msg.likeMessage(this.message.id, userId).subscribe(
            () => {
              this.message.Likes.push({ "userId": userId, "messageId": this.message.id})
            }
          );
        }
      }
    }

    isAlreadyLike():boolean {
      return this.message.Likes.some(element => {
        return (element.userId == this.authService.getUserId())
      })
    }

}
