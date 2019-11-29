import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Router, Route} from '@angular/router';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { User } from 'src/app/Class/user/user';
import { map } from 'rxjs/operators';
import { helpers } from 'chart.js';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('UserToken')
  })
};
@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
 
  
   url = 'http://localhost:8080/';
   public temoin = false;
   public temoinRegister = false;
  
   private currentUserSubject: BehaviorSubject<User>;
   public currentUser: Observable<User>;

   constructor(private http: HttpClient,private router:Router) {
       this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
       this.currentUser = this.currentUserSubject.asObservable();
   }

 
 
logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
public get currentUserValue(): User {
  return this.currentUserSubject.value;
}
  login( user ) {
    return this.http.post(this.url + 'api/auth/signin', { usernameOrEmail: user.username,
      password: user.password,})
    .pipe(map(user => {
        // login successful if there's a jwt token in the response 
        if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('AccessToken', user["accessToken"]);

            localStorage.setItem('TokenType', user["tokenType"]);

            localStorage.setItem('UserToken',user["tokenType"]+' ' +user["accessToken"]);
            console.log('UserToken  '  + localStorage.getItem('UserToken'))

            let tokendecoded = jwt_decode(JSON.stringify(user));
            localStorage.setItem('userId', tokendecoded.sub);

            this.currentUserSubject.next(user);
        }
        return user;
    }));

  }
  enregistrer(user) {
    this.temoin = false;
    console.log(user)
    return this.http.post(this.url + 'api/auth/signup', {
      username: user.username,
      email: user.email,
      password: user.password,
    }, { observe: 'response'}).subscribe(response => {

      let element : HTMLElement = document.getElementById('dologin') as HTMLElement;
      element.click();
      this.temoinRegister = true;
    }, error  => {
      console.log(error);

    });

  }
  public getAllUsers():Observable<any>{
      return this.http.get(this.url+'user/all',httpOptions);
  
    } 
    
 
}
