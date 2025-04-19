import { Component, ChangeDetectionStrategy, signal, inject} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly panelOpenState = signal(false);
  private readonly router = inject(Router);
  nameClient? = '';
  clientPass? = '';
  nameMoto? = '';
  motoPass? = '';
  nameAdmin? = '';
  adminPass? = '';

  login(code: any) {
    console.log(code);
    switch (code) {
      case 0:
        this.router.navigate(['/dashboard', { user: User.ADMINISTRADOR }]);
        break;
      case 1:
        break;
      case 2:
        break;
    }
  }
}