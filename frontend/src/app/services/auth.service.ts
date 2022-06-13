import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import * as moment from 'moment';

const jwt = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private uriseg = 'http://localhost:3000/api/auth';
    private decodedToken!: string;
    userId!: string;

    constructor(private http: HttpClient,
                private router: Router) { }
    
    public register(userData: any): Observable<any> {
        const URI = this.uriseg + '/signup';
        return this.http.post(URI, userData);
    }
    public login(userData: any): Observable<any> {
        const URI = this.uriseg + '/login';
        return this.http.post(URI, userData).pipe(map(rep => {
            console.log(rep);
        return this.saveToken(rep);
    }));
    }



    private saveToken(rep: any): any {
        this.decodedToken = jwt.decodeToken(rep.token);
        localStorage.setItem('auth_tkn', rep.token);
        localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
        return rep.token;
    }

    public getUserId(): number | null {
        let jsonString = localStorage.getItem('auth_meta');
        if(jsonString) {
            return JSON.parse(jsonString).userId
        }
        return null
    }

    public logout() {
        localStorage.removeItem('auth_meta');
    }

}