import { Component, Input, OnInit } from '@angular/core';
import { MessageModel } from '../models/message.model';
import { Message } from '../models/newMessage.model';
import { MessagesService } from '../services/messages.service';
import { Observable } from 'rxjs';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model'

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})

export class SinglePostComponent implements OnInit {
  //propriétés personnalisées
  @Input() message!: Message;
  @Input() user!: User | null;
  //
  oneMessage$!: Observable<Message>;
  username!: string;
  buttonText!: string;
  // msgId!: number;
  
  //injection du service pour liker un post
  constructor(private msg: MessagesService,
    private route: ActivatedRoute,
    private authServive: AuthService,
    private router: Router) {}
    
    ngOnInit() {
      //typecast pour changer un string en number
      const messageId = +this.route.snapshot.params['id'];
      this.oneMessage$ = this.msg.getMessageById(messageId);
      //
      this.username = this.authServive.getUsername();
      this.buttonText= "J'aime";
      // this.oneMessage$ = this.route.params.pipe(
      //   map(params => params['id']),
      //   switchMap(id => this.msg.getMessageById(id))
      // );
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
              
    
    onDelete(){
    //const messageId = this.route.snapshot.params['id'];
    // const messageId = this.msg.getMessageById(this.message.id);
    // console.log(messageId);
    
    // this.msg.deleteMessage().subscribe(
    //   () => this.router.navigateByUrl('/home'),
    //   error => {
    //     if (error.status == 401) {
    //       console.log('Vous ne pouvez pas supprimer ce message');
          
    //     }
    //   });
  }
    
    //méthode like simplifiée
    // onLike(messageId: number) {
    //   if (this.buttonText === "J'aime") {
    //     this.oneMessage$ = this.msg.likeMessageById(messageId, 'like').pipe(
    //       tap(() => this.buttonText = "Je n'aime plus")
    //     );
    //     } else {
    //       this.oneMessage$ = this.msg.likeMessageById(messageId, 'unlike').pipe(
    //         tap(() => this.buttonText = "J'aime")
    //     );
    //   }
    // }
              
              
              


    //méthode like
  onLike(messageId: number) {
    if (this.buttonText === "J'aime") {
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
          this.buttonText = "J'aime";
        })
      ).subscribe();
    }
  }
}
