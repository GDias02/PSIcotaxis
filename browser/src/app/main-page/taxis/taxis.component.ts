import { Component, ViewChild } from '@angular/core';
import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent {
  taxis: Taxi[] = [];

  displayedColumns: string[] = ['marcaEModelo', 'ano', 'matricula', 'conforto','registo'];
  dataSource = new MatTableDataSource<Taxi>(this.taxis); 

  @ViewChild(MatSort) sort!: MatSort;

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

    this.sort.active = 'registo'; // Column to sort by
    this.sort.direction = 'desc'; // Sort direction (e.g., newest first)
    this.sort.sortChange.emit(); // Trigger the sort
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

  delete(taxi: Taxi): void {
    this.taxis = this.taxis.filter(m => m !== taxi);
    this.dataSource.data = this.taxis;
    this.taxiService.deleteTaxi(taxi._id!).subscribe();
  }
}