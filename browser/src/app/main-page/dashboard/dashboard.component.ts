import { Component, Input } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { Motorista } from '../motorista';
import { Gestor } from '../gestor';
import { Cliente } from '../cliente';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user?: Motorista | Gestor | Cliente;
  usertype: User = User.NAO_AUTENTICADO;
  navLinks = [{
          label: '',
          link: '',
          index: 0
        }];
  activeLink = this.navLinks[0];
  constructor(private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({user}) => {
      this.user = user;
      this.userService.getCurrentUserType().subscribe(currentUser => {
        this.usertype = currentUser;
        this.generateLinks();
      });
    });
  }

  generateLinks(): void {
    this.navLinks.pop();
    switch (this.usertype) {
      case User.CLIENTE:
        this.navLinks.push({
          label: 'O meu perfil',
          link: `clientes/${this.user!._id}`,
          index: 0
        });
        this.navLinks.push({
          label: 'Criar pedido',
          link: 'pedidos',
          index: 1
        });
        break;
      case User.MOTORISTA:
        this.navLinks.push({
          label: 'O meu perfil',
          link: `motoristas/${this.user!._id}`,
          index: 0
        });
        this.navLinks.push({
          label: 'Registar Turno',
          link: 'turno/create',
          index: 1
        });
        this.navLinks.push({
          label: 'Taxis',
          link: 'taxis',
          index: 2
        });
        this.navLinks.push({
          label: 'Viagens',
          link: 'motorista/viagens',
          index: 3
        });
        break;
      case User.GESTOR:
        this.navLinks.push({
          label: 'Taxis',
          link: 'taxis',
          index: 0
        });
        this.navLinks.push({
          label: 'Motoristas',
          link: 'motoristas',
          index: 1
        });
        this.navLinks.push({
          label: 'Viagens',
          link: 'viagens',
          index: 2
        });
        this.navLinks.push({
          label: 'Configuracoes',
          link: 'configs',
          index: 3
        });
        break;
    }
  }
}
