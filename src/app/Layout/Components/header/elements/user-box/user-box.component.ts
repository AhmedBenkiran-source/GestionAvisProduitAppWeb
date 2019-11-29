import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { User } from 'src/app/Class/user/user';
import { AuthentificationService } from 'src/app/service/authentification/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  currentUser: User;
  public isActive: any;

  constructor(
    private router: Router,
    public globals: ThemeOptions,
    private authenticationService: AuthentificationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}
 
  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
