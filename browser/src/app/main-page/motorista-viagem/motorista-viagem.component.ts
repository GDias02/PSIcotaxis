import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import { Turno } from '../turno';
import { TurnoService } from '../turno.service';

@Component({
  selector: 'app-motorista-viagem',
  templateUrl: './motorista-viagem.component.html',
  styleUrls: ['./motorista-viagem.component.css']
})
export class MotoristaViagemComponent {
  
  turno?: Turno;
  duration: number = 0;

  iniciar: boolean = true;

  viagemForm = new FormGroup({
    /* inicio: new FormControl(new Date(this.inicio), [Validators.required, this.inicioBeforeFim()]),
    fim: new FormControl(new Date(this.fim), [Validators.required, this.fimAfterInicio(), this.turnoMaximoOitoHoras()]) */
  });

  viagemFinalForm = new FormGroup({
    /* inicio: new FormControl(new Date(this.inicio), [Validators.required, this.inicioBeforeFim()]),
    fim: new FormControl(new Date(this.fim), [Validators.required, this.fimAfterInicio(), this.turnoMaximoOitoHoras()]) */
  });

  constructor(
    private route: ActivatedRoute,
    private turnoService: TurnoService,
    private location: Location,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getTurno();
  }

  getTurno(): void {
    const id = this.route.snapshot.paramMap.get('id');
    /* this.turnoService.getTurno(id!)
      .subscribe((turno: Turno) => this.turno = turno); */
  }

  goBack(): void {
    this.location.back();
  }

  onViagemInit(): void {
    //TODO
  }

  onViagemStop(): void {
    //TODO
  }
}
