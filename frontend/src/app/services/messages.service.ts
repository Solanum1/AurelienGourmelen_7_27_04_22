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
        );
    }

    //Méthode pour ajout d'un message
    addMessage(formValue: {title:string, content: string, attachment: string }, userId: number): Observable<Message> {
        return this.http.post<Message>('http://localhost:3000/api/posts', {
            ...formValue, UserId: userId
        });

        // return this.getAllMessages().pipe(
        //     map(messages => [...messages].sort((a: Message, b: Message) => a.id - b.id)),
        //     map(sortedMessages => sortedMessages[sortedMessages.length -1]),
        //     map(previousMessage => ({
        //         ...formValue, 
        //         likes: 0,
        //         createdAt: new Date(),
        //         id: previousMessage.id +1
        //     })),
        //     switchMap(newMessage => this.http.post<Message>('http://localhost:3000/api/posts/', newMessage))
        // )
    }
}

