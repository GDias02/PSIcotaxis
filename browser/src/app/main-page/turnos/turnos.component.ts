import { Component } from '@angular/core';
import { Motorista } from '../motorista';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TurnoService } from '../turno.service';
import { Turno, TurnoCompleto } from '../turno';
import { MatTableDataSource } from '@angular/material/table';
import { TaxiService } from '../taxi.service';
import { Taxi } from '../taxi';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {
  user?: Motorista;
  turnos: TurnoCompleto[] = [];

  displayedColumns: string[] = ['inicio', 'fim', 'taxi', 'conforto'];
  dataSource = new MatTableDataSource<TurnoCompleto>(this.turnos);

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private turnoService: TurnoService,
    public datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ user }) => {
      this.turnoService.getTurnosDeMotorista(user['_id'])
        .subscribe(t => {
          this.turnos = t;
          this.dataSource.data = t;
        });
      this.user = user;
    });
  }

  showTurnoCreate() {
    this.router.navigate([`${this.router.url}/create`]);
  }

}
