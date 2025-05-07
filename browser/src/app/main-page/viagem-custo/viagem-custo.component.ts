import { Component, OnInit, } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, AbstractControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { CustoService } from '../custo.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-viagem-custo',
  templateUrl: './viagem-custo.component.html',
  styleUrls: ['./viagem-custo.component.css']
})
export class ViagemCustoComponent implements OnInit {
  // Default values for inicio and fim
  now: string = new Date().toISOString().slice(0, 16)

  conforto: string = "basico";
  inicio: string = this.now;
  fim: string = this.now;

  custo: number = 0;


  custoForm = new FormGroup({
    conforto: new FormControl(this.conforto, [Validators.required, Validators.pattern('^basico|luxuoso$')]),
    inicio: new FormControl(new Date(this.inicio), [Validators.required, this.inicioBeforeFim()]),
    fim: new FormControl(new Date(this.fim), [Validators.required, this.fimAfterInicio()])
  })

  constructor(
    private location: Location,
    private custoService: CustoService
  ) {}

  ngOnInit(): void {
    /* this.custoForm.get('inicio')!.valueChanges.subscribe(value => {
      this.custoForm.get('fim')!.setValue(value, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
    }, error => {}, () => {});

    this.custoForm.get('fim')!.valueChanges.subscribe(value => {
      this.custoForm.get('inicio')!.setValue(value, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
    }, error => {}, () => {}); */
  }

  inicioBeforeFim(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inicio = control.value;
      if (inicio < this.fim!) return null;
      else return { inicioBeforeFim: true, fimAfterInicio: true }
    }
  }

  fimAfterInicio(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fim = control.value;
      if (this.inicio! < fim) return null;
      else return { inicioBeforeFim: true, fimAfterInicio: true }
    }
  }

  updateValidityFim(): void {
    this.custoForm.controls['fim'].updateValueAndValidity();
  }

  updateValidityInicio(): void {
    this.custoForm.controls['inicio'].updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.custoForm.invalid) return;
    this.custoService.calcularCustoViagem(this.inicio, this.fim, this.conforto).subscribe(custo => this.custo = custo);
  }

  goBack(): void {
    this.location.back();
  }
}
