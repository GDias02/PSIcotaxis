import { Component, ViewChild, inject} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css'],
})
export class MotoristasComponent {
  motoristas: Motorista[] = [];

  displayedColumns: string[] = ['nif', 'nome', 'registo', 'accoes'];
  dataSource = new MatTableDataSource<Motorista>(this.motoristas); 

  @ViewChild(MatSort) sort!: MatSort;

  private _snackBar = inject(MatSnackBar);
  
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

  async apagarMotorista(motorista: Motorista): Promise<void> {
    try {
      await firstValueFrom(this.motoristaService.deleteMotorista(motorista._id));
      this.motoristas = this.motoristas.filter(m => m !== motorista);
      this.dataSource.data = this.motoristas;
      this._snackBar.open("Motorista apagado", "Okay", {duration:3000});
    } catch (error) {
      this._snackBar.open(`Não foi possível apagar o motorista devido aos seguintes erro(s): ${error}`, 'Okay', {duration:15000});
    }
  }

  editarMotorista(motorista: Motorista): void {
    this.router.navigate([`${this.router.url}/update/${motorista._id}`]);
  }
}
