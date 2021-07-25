import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {  throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

   constructor(private http: HttpClient) {

    }

    login(username:string, password:string ) {
        return this.http.post<User>('http://localhost:44365/api/login/authenticate', {username, password});
    }

    getUserName(){
        return localStorage.getItem('username');
    }

    getRole(){
        return localStorage.getItem('role');
    }
          
    public setSession(authResult : User) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id', String(authResult.id));
        localStorage.setItem('id_token', authResult.jwt);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        localStorage.setItem('role', authResult.role);
        localStorage.setItem('username', authResult.username);
    }          

    getSession(): User | null{
        const id = localStorage.getItem('id');
        const username = localStorage.getItem('username');
        const jwt= localStorage.getItem('id_token');
        const expires_at = localStorage.getItem('expires_at');
        const role = localStorage.getItem('role');
        if(id && username && jwt && expires_at && role){
            return {
                id: Number(id),
                username: username,
                jwt: jwt,
                expiresIn : moment.duration(moment(expires_at).diff(moment.now())).asSeconds(),
                role: role
            }
        }
        return null;
    }

    logout() {
        localStorage.removeItem("id");
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
