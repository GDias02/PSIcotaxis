import { Component, ChangeDetectionStrategy, signal, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
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

  user: string = 'Utilizador';

  @Input()
  userName = '';
  userPass = '';
  erro: string = '';

  constructor(private readonly userService: UserService) {}

  login() {
    const tipo = this.getUserType();

    this.userService.setCurrentUserType(tipo);
    this.userService.setCurrentUserName(this.userName);

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
