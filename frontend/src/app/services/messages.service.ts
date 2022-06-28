import { HttpClient } from "@angular/common/http";
import { Message } from "../models/newMessage.model";
import { Observable, switchMap } from "rxjs"
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators"

const uripost = 'http://localhost:3000/api/posts';

@Injectable ({
    providedIn: 'root'
})

export class MessagesService {

    constructor(private http: HttpClient){}

    //Récupérer tous les messages
    getAllMessages(): Observable<Message[]> {
        return this.http.get<Message[]>(uripost);
    }
    
    //Récupérer un message par son id
    getMessageById(messageId: number):Observable<Message>{
        return this.http.get<Message>(uripost + '/' + messageId);        
    }

    //Méthode pour ajouter d'un message
    addMessage(formValue: {title:string, content: string, attachment: string }, userId: number): Observable<Message> {
        return this.http.post<Message>(uripost, {
            ...formValue, UserId: userId
        });
    }

    //Appel API pour modifier un message
    editMessage(messageId: number, data: FormData):Observable<Message>{
        return this.http.put<Message>(uripost + '/' + messageId, data);
    }

    //Appel API pour supprimer un message
    deleteMessage(messageId: number):Observable<Message>{
        return this.http.delete<Message>(uripost + '/' + messageId);
    }



    //Méthode pour obtenir l'username de celui qui a posté le message
    // getUsernameByMessage(messageId: number):Observable<Message>{
    //     return this.getMessageById(messageId).pipe(
    //         map ( username => ({
    //             ...username
    //         }))
    //     )
    // }

    //Méthode pour la gestion des likes - Utilisation d'un literal type
    likeMessageById(messageId: number, likeType: 'like' | 'unlike'): Observable<Message>{
        return this.getMessageById(messageId).pipe(
            map( message => ({
                ...message, 
                likes: message.likes + (likeType === 'like' ? 1 : -1)
            })),
            switchMap(updatedMessage => this.http.put<Message>(`http://localhost:3000/api/posts/${messageId}`, updatedMessage))
        );
    }


}

