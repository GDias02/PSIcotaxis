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
    label: 'Taxis',
    link: 'taxis',
    index: 0
  },{
    label: 'Viagens',
    link: 'viagens',
    index: 3
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
          label: 'Motoristas',
          link: 'motoristas',
          index: 1
        });
        break;
      case User.MOTORISTA:
        this.navLinks.push({
          label: 'Motoristas',
          link: 'motoristas',
          index: 1
        });
        this.navLinks.push({
          label: 'O meu perfil',
          link: '/',
          index: 1
        });
        break;
      case User.GESTOR:
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
        break;
    }
  }
}
