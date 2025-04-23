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
  confortos = ['básico', 'luxuoso'];
  optionsMarcas: string[] = [];
  filteredOptionsMarcas?: Observable<string[]>;
  optionsModelos: string[] = [];
  filteredOptionsModelos?: Observable<string[]>;

  matricula?: string;
  anoDeCompra?: Date;
  marca?: string;
  modelo?: string;
  conforto?: string;


  constructor(
    private route: ActivatedRoute,
    private taxiService: TaxiService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getMarcas();
    this.filteredOptionsMarcas = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        this.marca = value ?? undefined;
        const name = typeof value === 'string' ? value : '';
        return name ? this._filter(name as string) : this.optionsMarcas.slice();
      }),
    );
  }

  getMarcas(): void {
    this.taxiService.getMarcasEModelos()
      .subscribe(marcas => {
        for (let key of Object.getOwnPropertyNames(marcas)) {
          this.optionsMarcas.push(key);
        }
      });
  }

  displayFn(marca: string): string {
    return marca;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.optionsMarcas ? this.optionsMarcas.filter(option => option.toLowerCase().includes(filterValue)) : [];
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.matricula = this.matricula!.toLocaleUpperCase();
    if (!this.matricula!.match("[A-Z|0-9]{2}\\-[A-Z|0-9]{2}\\-[A-Z|0-9]{2}")){console.error('A matricula tem de ser do formato: XX-XX-XX');return}
    if (this.anoDeCompra!.getFullYear() > new Date().getFullYear()){console.error('O ano de compra nao pode ser depois do ano atual!');return}
    if (!this.confortos.includes(this.conforto!)){console.error('O conforto de um taxi tem de ser básico ou luxuoso.');return}
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
      this.marca !== "" &&
      this.modelo !== undefined &&
      this.anoDeCompra !== undefined &&
      this.conforto !== undefined;
  }
  logstats(): void {
      console.log("matricula "+this.matricula);
      console.log("marca "+this.marca);
      console.log("modelo " + this.modelo);
      console.log("ano de compra "+this.anoDeCompra);
      console.log("conforto"+this.conforto);
  }
}

