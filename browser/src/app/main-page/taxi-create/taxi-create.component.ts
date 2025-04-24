import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { map, Observable, startWith } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-taxi-create',
  templateUrl: './taxi-create.component.html',
  styleUrls: ['./taxi-create.component.css'],
})

export class TaxiCreateComponent {
  marcaControl = new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]);
  matricula?: string;
  anoDeCompra?: Date;
  marca?: string;
  modelo?: string;
  conforto?: string;
  confortos = ['básico', 'luxuoso'];

  taxiForm = new FormGroup({
      //marca: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
      modelo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
      conforto: new FormControl('', [Validators.required, Validators.pattern('^básico|luxuoso$') ]),
      anoDeCompra: new FormControl('', [Validators.required, this.dataInRange()]),
      matricula: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z|0-9]{2}\\-[a-zA-Z|0-9]{2}\\-[a-zA-Z|0-9]{2}")]),
    })
  optionsMarcas: string[] = [];
  filteredOptionsMarcas?: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private taxiService: TaxiService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getMarcas();
    this.filteredOptionsMarcas = this.marcaControl.valueChanges.pipe(
      startWith(''),
      map(value => {
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
    this.logstats();
    this.taxiService.addTaxi({
      matricula: this.matricula!.toLocaleUpperCase(),
      anoDeCompra: this.anoDeCompra,
      marca: this.marcaControl.value,
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

  onSubmit(): void {
    if (this.taxiForm.invalid) return;
    this.save();
  }

  dataInRange(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const data = control.value;
      if (new Date("1900") < data && data < new Date(Date.now())) return null;
      else return { dataInRange: true }
    }
  }

  allFilled(): boolean {
    return this.matricula !== undefined &&
      this.marcaControl !== undefined &&
      this.modelo !== undefined &&
      this.anoDeCompra !== undefined &&
      this.conforto !== undefined;
  }

  logstats(): void {
      console.log("matricula "+this.matricula);
      console.log("marca "+this.marcaControl.value);
      console.log("modelo " + this.modelo);
      console.log("ano de compra "+this.anoDeCompra);
      console.log("conforto"+this.conforto);
  }
}

