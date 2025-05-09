import { Component, Input } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: User = User.NAO_AUTENTICADO;
  navLinks = [{
    label: '',
    link: '',
    index: -1
  }];
  activeLink = this.navLinks[0];
  constructor(private readonly userService: UserService) {
    this.userService.getCurrentUserType().subscribe(currentUser => this.user = currentUser);
    this.generateLinks();
  }

  generateLinks(): void {
    switch (this.user) {
      case User.CLIENTE:
        this.navLinks.push({
          label: 'Viajar',
          link: 'pedidos/criar',
          index: 0
        })
        this.navLinks = this.navLinks.slice(1);
        break;
      case User.MOTORISTA:
        this.navLinks.push({
          label: 'O meu perfil',
          link: '/',
          index: 0
        });
        this.navLinks.push({
          label: 'Atender um cliente',
          link: "pedidos/atender",
          index: 1
        });
        this.navLinks.push({
          label: 'Registar Turno',
          link: 'turno/create',
          index: 2
        });
        this.navLinks = this.navLinks.slice(1);
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
          label: 'Configuracoes',
          link: 'configs',
          index: 2
        });
        this.navLinks.push({
          label: 'Viagens',
          link: 'viagens',
          index: 3
        })
        this.navLinks.push({
          label: 'Registar Turno',
          link: 'turno/create',
          index: 4
        });
        this.navLinks = this.navLinks.slice(1);
        break;
    }
  }
}
