import { Component } from '@angular/core';
import { Motorista } from './motorista';
import { ActivatedRoute, Router } from '@angular/router';
import { Gestor } from './gestor';
import { Cliente } from './cliente';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  welcome = "Bem-vindo ao Psicotaxis";
  username = "";
  user?: Motorista | Gestor | Cliente;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  };

  ngOnInit(): void {
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
