import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const jwt = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private uriseg = 'http://localhost:3000/api/auth';
    private decodedToken!: string;
    userId!: string;

    constructor(private http: HttpClient,
                private router: Router) 
                {}
    
    public register(userData: any): Observable<any> {
        const URI = this.uriseg + '/signup';
        return this.http.post(URI, userData);
    }
    public login(loginEmail:string, loginPassword: string): Observable<any> {
        const URI = this.uriseg + '/login' ;
        console.log(URI);
        return this.http.post<any>(URI, {
            "email": loginEmail,
            "password": loginPassword
        });
    }
    
    private saveToken(rep: any): any {
        this.decodedToken = jwt.decodeToken(rep.token);
        localStorage.setItem('auth_tkn', rep.token);
        localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
        return rep.token;
    }

    public getToken() {
        let token2 = localStorage.getItem('auth_meta');
        return token2;
    }

    //Pour obtenir l'username de l'utilisateur connecté
    public getUsername() {
        let jsonUsername = localStorage.getItem('auth_meta');
        console.log(jsonUsername);
        if(jsonUsername) {
            return JSON.parse(jsonUsername).username;
        }
    }

    public getUserId(): number | null {
        let jsonString = localStorage.getItem('auth_meta');
        if(jsonString) {
            return JSON.parse(jsonString).userId;
        } else {
            return null;
        }
    }

    public logout() {
        localStorage.removeItem('auth_meta');
    }

        // public login(userData: any): Observable<any> {
    //     const URI = this.uriseg + '/login';

    //     console.log(userData);
    //     console.log(this.http);
        
    //     return this.http.post<any>(URI, userData)
    //     .pipe(map(rep => {
    //         console.log(rep);

    //     return this.saveToken(rep);
    // }));
    // }

}