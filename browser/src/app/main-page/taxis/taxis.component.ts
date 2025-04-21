import { Component } from '@angular/core';
import { TAXIS } from 'src/app/main-page/mock-taxis';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent {
  taxis = TAXIS;
}