import { Component } from '@angular/core';
import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent {
  taxis: Taxi[] = [];

  displayedColumns: string[] = ['marcaEModelo', 'ano', 'matricula', 'conforto','registo'];
  dataSource = this.taxis;

  constructor(
    private taxiService: TaxiService,
    private readonly router: Router,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getTaxis();
  }

  getTaxis(): void {
    this.taxiService.getTaxis()
        .subscribe(taxis => this.taxis = taxis);
  }

  showTaxiCreate() {
    this.router.navigate([`${this.router.url}/create`]);
  }

  showTaxiDetail(row: Taxi) {
    this.router.navigate([`${this.router.url}/${row._id}`]);
  }

  delete(taxi: Taxi): void {
    this.taxis = this.taxis.filter(m => m !== taxi)
    this.taxiService.deleteTaxi(taxi._id!).subscribe();
  }
}