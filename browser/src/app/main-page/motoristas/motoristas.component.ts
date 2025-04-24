import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css'],
})
export class MotoristasComponent {
  motoristas: Motorista[] = [];

  displayedColumns: string[] = ['nif', 'nome', 'registo'];
  dataSource = new MatTableDataSource<Motorista>(this.motoristas); 

  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private motoristaService: MotoristaService,
    private readonly router: Router,
    public datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.getMotoristas();
  }
  
  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;

    setTimeout(() => {
      this.sort.active = 'registo';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit();
    });
  }

  getMotoristas(): void {
    this.motoristaService.getMotoristas().subscribe((motoristas) => {
      this.motoristas = motoristas;
      this.dataSource.data = motoristas;
    });
  }

  showMotoristaCreate() {
    this.router.navigate([`${this.router.url}/create`]);
  }

  showMotoristaDetail(row: Motorista) {
    this.router.navigate([`${this.router.url}/${row._id}`]);
  }

  delete(motorista: Motorista): void {
    this.motoristas = this.motoristas.filter(m => m !== motorista)
    this.dataSource.data = this.motoristas;
    this.motoristaService.deleteMotorista(motorista._id!).subscribe();
  }

}
