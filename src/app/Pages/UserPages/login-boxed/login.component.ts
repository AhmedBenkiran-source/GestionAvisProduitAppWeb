import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from 'src/app/Class/user/user';
import { AuthentificationService } from 'src/app/service/authentification/authentification.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User()  ;
  submitted: boolean;
  loading: boolean;
  error: any;


  constructor(private authentificationService : AuthentificationService ,  public router: Router) {

  }

  ngOnInit() {
    document.body.style.background = '#FFFF';

  }

  public login() {
    console.log(this.user)
    this.submitted = true;
    this.loading = true;
    this.authentificationService.login(this.user)
        .pipe()
        .subscribe(
            data => {
                this.router.navigate(['']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}

  }


