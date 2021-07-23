import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular front app for products';
  user: User | null;
  username: string;
  password: string;
  shownContextMenu: boolean;
  loggedIn: boolean;
  loginError: string;

  constructor(private authService: AuthService){
    this.user = null;
    this.loginError = '';
    this.username = '';
    this.password = '';
    this.loggedIn = this.authService.isLoggedIn();
    if(this.loggedIn){
      // this.username = this.authService.getUserName();
      this.user = this.authService.getSession();
      this.username = this.user? this.user.username: '';
    }
    this.shownContextMenu = false;
  }

  login(){
    this.loginError = '';
    this.authService.login(this.username, this.password).subscribe(
      res => {
        this.authService.setSession(res);
        this.loggedIn = true;
      },err =>{
        console.log("Authentication Error");
        console.error(err);
        this.username = '';
        this.password = '';
        this.loginError = 'incorrect username or password';
      }
    );
  }

  signOut(){
    this.shownContextMenu = false;
    this.authService.logout();
    this.loggedIn = false;
    this.user = null;
    this.loginError = '';
    this.username = '';
    this.password = '';
  }

}
