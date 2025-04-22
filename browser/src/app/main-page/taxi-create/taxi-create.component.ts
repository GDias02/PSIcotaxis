import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-taxi-create',
  templateUrl: './taxi-create.component.html',
  styleUrls: ['./taxi-create.component.css'],
})

export class TaxiCreateComponent {
  myControl = new FormControl<string>('');
  options: string[] = [];
  filteredOptions?: Observable<string[]>;
  
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

  ngOnInit() {
    this.getMarcas();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : '';
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  getMarcas(): void {
    this.taxiService.getMarcasEModelos()
        .subscribe(marcas => {
          for (let key of Object.getOwnPropertyNames(marcas)){
            this.options.push(key);
          }
        });
  }

  displayFn(marca: string): string {
    return marca;
  }

  
  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.options ? this.options.filter(option => option.toLowerCase().includes(filterValue)): [];
  }


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
      
