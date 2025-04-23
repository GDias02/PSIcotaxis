import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';
import { Morada } from '../morada';

@Component({
  selector: 'app-motorista-detail',
  templateUrl: './motorista-detail.component.html',
  styleUrls: ['./motorista-detail.component.css']
})
export class MotoristaDetailComponent {
  motorista?: Motorista;
  morada?: Morada;

  constructor(
    private route: ActivatedRoute,
    private motoristaService: MotoristaService,
    private location: Location,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getMotorista();
  }

  getMotorista(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.motoristaService.getMotorista(id!)
      .subscribe(motorista => this.populateMotorista(motorista));
  }

  populateMotorista(motorista: Motorista): void {
    this.motorista = motorista;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    //TO DO
  }
}
