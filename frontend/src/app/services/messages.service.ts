import { HttpClient } from "@angular/common/http";
import { Message } from "../models/newMessage.model";
import { Observable, switchMap } from "rxjs"
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators"

@Injectable ({
    providedIn: 'root'
})

export class MessagesService {

    constructor(private http: HttpClient){}

    //Méthode pour récupérer tous les messages
    getAllMessages(): Observable<Message[]> {
        return this.http.get<Message[]>('http://localhost:3000/api/posts');
    }
    
    //Méthode pour récupérer un message
    getMessageById(messageId: number):Observable<Message>{
        return this.http.get<Message>(`http://localhost:3000/api/posts/${messageId}`);
    }

    //Méthode pour la gestion des likes - Utilisation d'un literal type
    likeMessageById(messageId: number, likeType: 'like' | 'unlike'): Observable<Message>{
        return this.getMessageById(messageId).pipe(
            map( message => ({
                ...message, 
                likes: message.likes + (likeType === 'like' ? 1 : -1)
            })),
            switchMap(updatedMessage => this.http.put<Message>(`http://localhost:3000/api/posts/${messageId}`, updatedMessage))
        )

    }
    
}

