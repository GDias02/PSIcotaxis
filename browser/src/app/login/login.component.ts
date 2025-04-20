import { Component, ChangeDetectionStrategy, signal, inject, Input, Injectable } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly panelOpenState = signal(false);
  private readonly router = inject(Router);
  constructor(private readonly userService: UserService){};

  user: string = 'Utilizador';

  @Input()
  userName = '';
  userPass = '';

  login() {
    this.userService.setCurrentUser(this.getUserType());
    this.router.navigate([`dashboard`]);
  }
  getUserType(): User {
    let currUser = User.NAO_AUTENTICADO;
    switch (this.user) {
      case "Cliente":
        currUser = User.CLIENTE;
        break;
      case "Motorista":
        currUser = User.MOTORISTA;
        break;
      case "Gestor":
        currUser = User.GESTOR;
        break;
    }
    return currUser;
  }
}