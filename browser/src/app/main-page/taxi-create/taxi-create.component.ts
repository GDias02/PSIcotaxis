import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { map, Observable, startWith } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from '../message.service';


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
  lugares?: number;
  conforto?: string;
  confortos = ['básico', 'luxuoso'];

  duplicateMatricula: boolean = false;

  taxiForm = new FormGroup({
      //marca: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
      modelo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
      conforto: new FormControl('', [Validators.required, Validators.pattern('^básico|luxuoso$') ]),
      anoDeCompra: new FormControl('', [Validators.required, this.dataInRange()]),
      lugares: new FormControl('', [Validators.required, Validators.min(1)]),
      matricula: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z|0-9]{2}\\-[a-zA-Z|0-9]{2}\\-[a-zA-Z|0-9]{2}"), this.duplicateMatriculaValidator()]),
    })
  optionsMarcas: string[] = [];
  filteredOptionsMarcas?: Observable<string[]>;
  optionsModelos: string[] = [];
  filteredOptionsModelos?: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private taxiService: TaxiService,
    private location: Location,
    private messageService: MessageService
  ) { }

  duplicateMatriculaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const matricula = control.value;
      if (!this.duplicateMatricula) return null;
      else return { duplicateNif: true }
    }
  }

  validMatricula(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const matricula = control.value;
      if (this.anoDeCompra! < new Date('1992')) {
          if (matricula.match("[A-Z]{2}\\-[0-9]{2}\\-[0-9]{2}")) return null;
          else return {invalidMatricula: true};
      }
      if (this.anoDeCompra! < new Date('2005')) {
          if (matricula.match("[0-9]{2}\\-[0-9]{2}\\-[A-Z]{2}")) return null;
          else return {invalidMatricula: true};
      }
      if (this.anoDeCompra! < new Date('2020')) {
          if (matricula.match("[0-9]{2}\\-[A-Z]{2}\\-[0-9]{2}")) return null;
          else return {invalidMatricula: true};
      } 
      if (this.anoDeCompra! <= new Date()){
          if (matricula.match("[A-Z]{2}\\-[0-9]{2}\\-[A-Z]{2}")) return null;
          else return {invalidMatricula: true};
      } else {
          return {invalidMatricula: true};
      }
    }
  }

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
          for(let model of marcas[key]){
            this.optionsModelos.push(model);
          }
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
    this.taxiService.addTaxi({
      matricula: this.matricula!.toLocaleUpperCase(),
      anoDeCompra: this.anoDeCompra,
      marca: this.marcaControl.value,
      modelo: this.modelo,
      lugares: this.lugares,
      conforto: this.conforto?.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ''),
    } as Taxi).subscribe({
      next: (taxi) => {
        if (taxi.name !== "HttpErrorResponse"){
          console.log('Created Taxi:', taxi);
          this.goBack();
        } else {
          //There was a specific error
          const error = taxi.error;
          console.log('Error creating taxi', error);
          if (error.code === 11000) {
            this.showErrors(Object.keys(error.keyPattern));
          }
        }
      }
    });
  }

  showErrors(controlNames: string[]) {
    for (let cname of controlNames) {
      switch (cname) {
        case "matricula": this.duplicateMatricula = true; this.taxiForm.controls["matricula"].updateValueAndValidity(); break;
      }
      this.messageService.add(`${cname} já existe na base de dados`);
    }
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
      this.lugares !== undefined &&
      this.conforto !== undefined;
  }

  logstats(): void {
      console.log("matricula "+this.matricula);
      console.log("marca "+this.marcaControl.value);
      console.log("modelo " + this.modelo);
      console.log("ano de compra "+this.anoDeCompra);
      console.log("lugares "+this.lugares);
      console.log("conforto"+this.conforto);
  }
}

