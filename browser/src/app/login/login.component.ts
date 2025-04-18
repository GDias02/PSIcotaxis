import { Component, ChangeDetectionStrategy, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly panelOpenState = signal(false);
  nameClient? = '';
  clientPass? = '';
  nameMoto? = '';
  motoPass? = '';
  nameAdmin? = '';
  adminPass? = '';
}