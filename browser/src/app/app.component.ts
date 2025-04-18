import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Psicotaxis';
  isLoggedIn = false;
  navLinks = [
    {
        label: 'Login',
        link: '/login',
        index: 0
    }, {
        label: 'Taxis',
        link: '/taxis',
        index: 1
    }, {
        label: 'Motoristas',
        link: '/motoristas',
        index: 2
    }, 
];

}