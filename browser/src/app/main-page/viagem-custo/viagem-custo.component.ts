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
    const agravamento = 1 + (configs.agravamento / 100);

    let dayMinutes = 0;
    let nightMinutes = 0;

    this.inicio = new Date(this.inicio!);
    this.fim = new Date(this.fim!);

    for (let currDate = this.inicio!; currDate < this.fim!; currDate!.setMinutes(currDate!.getMinutes() + 1)) {
      if (this.isNightTime(currDate.getHours())) nightMinutes += 1;
      else dayMinutes += 1;
    }

    this.custo = (dayMinutes * ppm) + (nightMinutes * ppm * agravamento);
  }

  isNightTime(hours: number): boolean {
    return (21 <= hours && hours <= 23) || (0 <= hours && hours <= 6);
  }

  goBack(): void {
    this.location.back();
  }
}
