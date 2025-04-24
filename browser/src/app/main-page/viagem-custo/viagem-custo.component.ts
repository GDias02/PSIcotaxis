import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, AbstractControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { ConfigService } from '../config.service';
import { Config } from '../config';

@Component({
  selector: 'app-viagem-custo',
  templateUrl: './viagem-custo.component.html',
  styleUrls: ['./viagem-custo.component.css']
})
export class ViagemCustoComponent implements OnInit {
  configAtual?: Config; 

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
    private configService: ConfigService,
    private location: Location
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
    this.calcularCustoViagem();
  }

  calcularCustoViagem() {
    if(new Date(this.inicio!) >= new Date(this.fim!)) return;
    this.configService.getConfigs().subscribe(configs => this.custoViagem(configs));
  };

  custoViagem(configs: Config) {
    this.configAtual = configs;
    let ppm;
    switch (this.conforto) {
      case "basico": ppm = configs.ppm_basico; break;
      case "luxuoso": ppm = configs.ppm_luxuoso; break;
      default: return;
    }
    const agravamento = (1 + configs.agravamento / 100);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let start = new Date(this.inicio);
    let end = new Date(this.fim);
    let minutosDeNoite = 0;
    let minutosDeDia = 0;
    while(start < end){
      let utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
      let utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
      let daydif = Math.floor((utc2 - utc1) / _MS_PER_DAY);
      if(daydif>0){
        let dayEnd = new Date(start);
        dayEnd.setDate(start.getDate()+1);
        dayEnd.setHours(0,0,0);
        minutosDeNoite += this.antesDoNascerDoSol(start, dayEnd);
        minutosDeDia += this.duranteODia(start, dayEnd);
        minutosDeNoite += this.depoisDoPorDoSol(start, dayEnd);
        start.setDate(start.getDate()+1);
        start.setHours(0, 0, 0);
      } else if (daydif === 0){
        minutosDeNoite += this.antesDoNascerDoSol(start, end);
        minutosDeDia += this.duranteODia(start, end);
        minutosDeNoite += this.depoisDoPorDoSol(start, end);
        break;
      }
    }

    this.custo = Math.round(((minutosDeDia * ppm) + (minutosDeNoite * ppm * agravamento))*100)/100;
  }

  antesDoNascerDoSol(start: Date, end: Date): number{
    let nascerDoSol = new Date(start);
    nascerDoSol.setHours(6, 0, 0);
    let endpoint = new Date(end);
    if(start < nascerDoSol){
      endpoint = (end <= nascerDoSol) ? end : nascerDoSol;
      return Math.floor((endpoint.getTime() - start.getTime())/60000);
    } else {
      return 0;
    }
  }

  duranteODia(start: Date, end: Date): number{
    let nascerDoSol = new Date(start);
    nascerDoSol.setHours(6, 0, 0);
    let porDoSol = new Date(start)
    porDoSol.setHours(21, 0, 0);
    let startpoint = (start < nascerDoSol) ? nascerDoSol : start;
    let endpoint = (end > porDoSol) ? porDoSol : end;
    return Math.floor((endpoint.getTime() - startpoint.getTime())/60000);;
  }

  depoisDoPorDoSol(start: Date, end: Date): number{
    let porDoSol = new Date(start);
    porDoSol.setHours(21, 0, 0);
    let startpoint = new Date(end);
    if(end > porDoSol){
      startpoint = (start <= porDoSol) ? porDoSol : start;
      return Math.floor((end.getTime() - startpoint.getTime())/60000);
    } else {
      return 0;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
