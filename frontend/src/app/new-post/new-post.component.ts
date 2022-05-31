import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '../models/newMessage.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


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


  username!: string;


  //Injection de l'outil FormBuilder qui simplifie la génération des formulaires réactifs
  constructor(private formBuilder: FormBuilder,
              private authServive: AuthService) { }

  ngOnInit(): void {
    this.username = "Aurélien";

    //Utilisation du FormBuilder pour construire le formulaire
    this.messageForm = this.formBuilder.group({
      title: [null],
      content: [null],
      attachment: [null],
      likes: [null]
    });

    //Initialisation du 
    this.messagePreview$ = this.messageForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        likes: 0
      }))
    );
  }
  //Méthode qui envoie le contenu du formulaire
  onSubmitForm(): void {
    console.log(this.messageForm.value);
  }

}
