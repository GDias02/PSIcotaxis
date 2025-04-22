import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css'],
})
export class MotoristasComponent {
  motoristas: Motorista[] = [];

  displayedColumns: string[] = ['nif', 'nome', 'registo'];
  dataSource = this.motoristas;

  constructor(
    private motoristaService: MotoristaService,
    private readonly router: Router,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getMotoristas();
  }

  getMotoristas(): void {
    this.motoristaService.getMotoristas()
        .subscribe(motoristas => this.motoristas = motoristas);
  }

  showMotoristaCreate() {
    this.router.navigate([`${this.router.url}/create`]);
  }

  showMotoristaDetail(row: Motorista) {
    this.router.navigate([`${this.router.url}/${row._id}`]);
  }

  delete(motorista: Motorista): void {
    this.motoristas = this.motoristas.filter(m => m !== motorista)
    this.motoristaService.deleteMotorista(motorista._id!).subscribe();
  }
}
