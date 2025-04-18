import { Component } from '@angular/core';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css']
})
export class MotoristasComponent {
  motoristas: Motorista[] = [];

  constructor(private motoristaService: MotoristaService) {}

  ngOnInit(): void {
    this.getMotoristas();
  }

  getMotoristas(): void {
    this.motoristaService.getMotoristas()
        .subscribe(motoristas => this.motoristas = motoristas);
  }

  delete(motorista: Motorista): void {
    this.motoristas = this.motoristas.filter(m => m !== motorista)
    this.motoristaService.deleteMotorista(motorista._id!).subscribe();
  }
}
