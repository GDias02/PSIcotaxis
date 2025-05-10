import { Injectable } from '@angular/core';
import { filter, finalize, Observable, of, switchMap, tap } from 'rxjs';

import { ConfigService } from './config.service';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class CustoService {

  custo: number | null = null;

  constructor(private configService: ConfigService) { }

  calcularCustoViagem(inicio: string, fim: string, conforto: string): Observable<number> {
    console.log(inicio)
    console.log(fim)
    if(new Date(inicio).getTime() >= new Date(fim).getTime()) return of(-1);

    return this.configService.getConfigs()
      .pipe(
        tap(configs => this.custoViagem(configs, inicio, fim, conforto)),
        switchMap(() => of(this.custo!))
      )
  };

  custoViagem(configs: Config, inicio: string, fim: string, conforto: string): void {
    let ppm;
    switch (conforto) {
      case "basico": ppm = configs.ppm_basico; break;
      case "luxuoso": ppm = configs.ppm_luxuoso; break;
      default: return;
    }
    const agravamento = (1 + configs.agravamento / 100);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let start = new Date(inicio);
    let end = new Date(fim);
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
}
