import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';
import { Morada } from '../morada';
import { MoradaService } from '../morada.service';

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
    private moradaService: MoradaService,
    private location: Location
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
    this.moradaService.getMorada(this.motorista.morada)
      .subscribe(morada => this.morada = morada);
  }

  goBack(): void {
    this.location.back();
  }
}
