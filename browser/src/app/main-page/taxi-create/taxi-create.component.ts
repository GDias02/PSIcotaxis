import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';

@Component({
  selector: 'app-taxi-create',
  templateUrl: './taxi-create.component.html',
  styleUrls: ['./taxi-create.component.css']
})

export class TaxiCreateComponent {
  matricula?: string;
  anoDeCompra?: Date;
  marca?: string;
  modelo?: string;
  conforto?: string;

  constructor(
    private route: ActivatedRoute,
    private taxiService: TaxiService,
    private location: Location,
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // Create morada and with it's id, create taxi
        this.taxiService.addTaxi({
          matricula: this.matricula,
          anoDeCompra: this.anoDeCompra,
          marca: this.marca,
          modelo: this.modelo,
          conforto: this.conforto,
        } as Taxi).subscribe({
          next: (taxi) => {
            console.log('Created Taxi:', taxi);
            this.goBack();
          },
          error: (err) => {
            console.error('Error creating taxi:', err);
          }
        });
      }
      allFilled(): boolean {
      return this.matricula !== undefined &&
              this.marca !== undefined &&
              this.modelo !== undefined &&
              this.anoDeCompra !== undefined &&
              this.conforto !== undefined;
    }
    }
      
