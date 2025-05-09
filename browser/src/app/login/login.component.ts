import { Component, ChangeDetectionStrategy, signal, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { LocService } from '../main-page/loc.service';
import { Motorista } from '../main-page/motorista';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly panelOpenState = signal(false);
  private readonly router = inject(Router);

  user: string = 'Utilizador';
  loggedInUser?: Motorista;

  @Input()
  userName = '';
  userPass = '';
  erro: string = '';

  constructor(
    private readonly userService: UserService,
    private locService: LocService
  ) {
    this.locService.setLocWatcher();
  }

  getCurrentMotorista(): void {
    const nif = Number(this.userName);
    this.userService.getMotorista(nif).subscribe(motorista => this.populateMotorista(motorista));
  }
  populateMotorista(motorista: Motorista): void {
    this.loggedInUser = motorista;
    this.userService.setCurrentUser(this.loggedInUser);
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

  login() {
    const tipo = this.getUserType();

    this.userService.setCurrentUserType(tipo);
    this.userService.setCurrentUserName(this.userName);

    switch(tipo){
      case User.CLIENTE:
        break;
      case User.MOTORISTA:
        this.getCurrentMotorista();
        break;
      case User.GESTOR:
        break;
    }
    this.router.navigate([`main-page`]);

    /*
    if (tipo === User.MOTORISTA) {
      if (!/^\d{9}$/.test(this.userName)) {
        this.erro = 'NIF inválido. Deve conter 9 dígitos.';
        return;
      }

      this.userService.getMotoristaByNif(this.userName).subscribe({
        next: (motorista) => {
          localStorage.setItem('motorista', JSON.stringify(motorista));
          this.router.navigate(['/painel-motorista']);
        },
        error: () => {
          this.erro = 'Motorista não encontrado.';
        }
      });
    } else {
      this.router.navigate([`main-page`]);
    }
      */
  }

}
