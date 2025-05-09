import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Motorista } from './motorista';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  welcome = "Bem-vindo ao Psicotaxis";
  username = "";
  user?: Motorista;

  constructor(private readonly activatedRoute: ActivatedRoute) {
  };

  ngOnInit(): void {
    console.log("loading main-page-component...");
    this.activatedRoute.data.subscribe(({user}) => {
      this.user = user;
      this.username = this.user!.nome;
    });
  }
}

/*
      if (currentUser["tipo" ] == "Motorista") {
        this.userM = currentUser; 
        this.username = this.userM!.nome
      } else {
        this.userService.getCurrentUserName().subscribe(u => this.username = u); 
      }
*/
