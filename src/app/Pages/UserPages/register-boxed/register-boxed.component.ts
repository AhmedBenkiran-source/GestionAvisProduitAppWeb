import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Class/user/user';
import { AuthentificationService } from 'src/app/service/authentification/authentification.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-boxed',
  templateUrl: './register-boxed.component.html',
  styleUrls: ['./register-boxed.component.css'],

})
export class RegisterBoxedComponent implements OnInit {
  constructor(private authentificationService : AuthentificationService) { }
  AddUser = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });
  ngOnInit() {
  }
  enregistrer() {
    const user = this.AddUser.getRawValue();

    console.log(user)
    this.authentificationService.enregistrer(user);
  }
}
