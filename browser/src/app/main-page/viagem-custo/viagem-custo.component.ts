import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { ConfigService } from '../config.service';
import { Config } from '../config';

@Component({
  selector: 'app-viagem-custo',
  templateUrl: './viagem-custo.component.html',
  styleUrls: ['./viagem-custo.component.css']
})
export class ViagemCustoComponent {
  configAtual?: Config; 
  conforto?: string;
  inicio?: Date;
  fim?: Date;
  custo: number = 0;

  constructor(
    private configService: ConfigService,
    private location: Location
  ) {}

  allFilled(): boolean {
    return this.conforto !== undefined && this.inicio !== undefined && this.fim !== undefined
  }

  calcularCustoViagem() {
    if(this.inicio! >= this.fim!) return;
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

    this.inicio = new Date(this.inicio!);
    this.fim = new Date(this.fim!);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let start = this.inicio;
    let end = this.fim;
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
