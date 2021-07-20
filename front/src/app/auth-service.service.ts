import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

   constructor(private http: HttpClient) {

    }

    login(email:string, password:string ) {
        return this.http.post<User>('/api/login/authenticate', {email, password}).subscribe(res =>{
          this.setSession(res);
        },
        err => {
          console.log("authentication error:\n" + err);
        }
        );
    }
          
    private setSession(authResult : User) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.jwt);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        localStorage.setItem('role', authResult.role);
        localStorage.setItem('username', authResult.username);
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = expiration && JSON.parse(expiration);
        return moment(expiresAt);
    }    
}
