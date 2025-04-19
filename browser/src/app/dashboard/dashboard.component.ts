import { Component, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: User | undefined;
  navLinks = [
    {
      label: 'Taxis',
      link: '/taxis',
      index: 0
    }, {
      label: 'Motoristas',
      link: '/motoristas',
      index: 1
    }, 
  ];
  activeLink = this.navLinks[0];
}
