import { HttpClient } from "@angular/common/http"
import { Message } from "../models/newMessage.model";
import { Observable } from "rxjs"
import { Injectable } from "@angular/core";

@Injectable ({
    providedIn: 'root'
})

export class MessagesService {

    constructor(private http: HttpClient){}

    getAllMessages(): Observable<Message[]> {
        return this.http.get<Message[]>('http://localhost:3000/api/posts');
    }

    getMessageById(messageId: number):Observable<Message>{
        return this.http.get<Message>(`http://localhost:3000/api/posts/${messageId}`);
    }
}

