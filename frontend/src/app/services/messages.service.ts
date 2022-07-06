import { HttpClient } from "@angular/common/http";
import { Message } from "../models/newMessage.model";
import { Observable } from "rxjs"
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';

const uripost = 'http://localhost:3000/api/posts';

@Injectable ({
    providedIn: 'root'
})

export class MessagesService {

    constructor(private http: HttpClient,
                private auth: AuthService){}

    //Obtenir tous les messages
    getAllMessages(): Observable<Message[]> {
        return this.http.get<Message[]>(uripost);
    }
    
    //Obtenir un message par son id
    getMessageById(messageId: number):Observable<Message>{
        return this.http.get<Message>(uripost + '/' + messageId);        
    }

    //Ajouter un message
    addMessage(formValue: {title:string, content: string, attachment: string }, userId: number): Observable<Message> {
        return this.http.post<Message>(uripost, {
            ...formValue, UserId: userId
        });
    }

    //Modifier un message
    editMessage(messageId: number, formValue: {title:string, content: string, attachment: string }):Observable<Message>{
        return this.http.put<Message>(uripost + '/' + messageId, formValue);
    }

    //Supprimer un message
    deleteMessage(messageId: number):Observable<Message>{
        return this.http.delete<Message>(uripost + '/' + messageId);
    }

    //Gestion des likes
    getLikes(messageId: number): Observable<Message>{
        return this.http.get<Message>(`http://localhost:3000/api/post/${messageId}/like`);
    }

    likeMessage(MessageId: number, UserId: number | null): Observable<Message>{
        return this.http.post<Message>(`http://localhost:3000/api/post/${MessageId}/like`, {UserId, MessageId});
    }

    unLikeMessage(messageId: number): Observable<Message>{
        return this.http.delete<Message>(`http://localhost:3000/api/post/${messageId}/like`);
    }

}

