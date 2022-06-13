import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../models/newMessage.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  //Variable qui contient l'objet du formulaire, de type FormGroup.
  messageForm!: FormGroup;
  //Observable pour aperçu du post
  messagePreview$!: Observable<Message>;
  urlRegex!: RegExp;

  //username!: string;
  //Injection de l'outil FormBuilder qui simplifie la génération des formulaires réactifs
  constructor(private formBuilder: FormBuilder,
              private authServive: AuthService,
              private router: Router, 
              private messagesService: MessagesService) { }

  ngOnInit(): void {
    //this.username = "Aurélien";
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    //Utilisation du FormBuilder pour construire le formulaire
    this.messageForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      attachment: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      likes: [null]
    }, {
      updateOn: 'blur'
    });

    //Initialisation de la prévisualisation
    this.messagePreview$ = this.messageForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        likes: 0
      }))
    );
  }
  //Méthode qui envoie le contenu du formulaire
  onSubmitForm() {
    let userId = this.authServive.getUserId();
    console.log(userId);
    
    if (userId) {
      this.messagesService.addMessage(this.messageForm.value, userId).pipe(
        tap(() => this.router.navigateByUrl('/home'))
      ).subscribe();
    }
  }

}
