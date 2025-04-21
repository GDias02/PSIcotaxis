import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  welcome = "Bem-vindo ao Psicotaxis";
  user = "";
  constructor(private readonly userService: UserService) {
    this.userService.getCurrentUserName().subscribe(currentUser => this.user = currentUser);
  }
}
