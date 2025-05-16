import { Component, inject, ViewChild } from '@angular/core';
import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent {
  taxis: Taxi[] = [];

  displayedColumns: string[] = ['marca', 'anoDeCompra', 'matricula', 'conforto','registo', 'accoes'];
  dataSource = new MatTableDataSource<Taxi>(this.taxis); 

  @ViewChild(MatSort) sort!: MatSort;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private taxiService: TaxiService,
    private readonly router: Router,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getTaxis();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    setTimeout(()=> {
    this.sort.active = 'registo'; // Column to sort by
    this.sort.direction = 'desc'; // Sort direction (e.g., newest first)
    this.sort.sortChange.emit(); // Trigger the sort
    });
  }

  getTaxis(): void {
    this.taxiService.getTaxis()
        .subscribe(taxis => {
          this.taxis = taxis;
          this.dataSource.data = taxis;
        });
  }

  showTaxiCreate() {
    this.router.navigate([`${this.router.url}/create`]);
  }

  showTaxiDetail(row: Taxi) {
    this.router.navigate([`${this.router.url}/${row._id}`]);
  }

  async deleteTaxi(taxi: Taxi): Promise<void> {
    try{
      await firstValueFrom(this.taxiService.deleteTaxi(taxi._id!));
      this.taxis = this.taxis.filter(m => m !== taxi);
      this.dataSource.data = this.taxis;
      this._snackBar.open("Taxi apagado com sucesso", "Okay", {duration: 3000});
    } catch (error) {
      this._snackBar.open(`Não foi possível apagar o taxi devido aos seguintes problemas:${error}`, "Okay", {duration:15000});
    }
  }

  editarTaxi(taxi: Taxi): void {
    this.router.navigate([`${this.router.url}/update/${taxi._id}`]);
  }

}