import { Component } from '@angular/core';
import { ConfigService } from '../config.service';
import { Config } from '../config';

@Component({
  selector: 'app-viagem-custo',
  templateUrl: './viagem-custo.component.html',
  styleUrls: ['./viagem-custo.component.css']
})
export class ViagemCustoComponent {
  constructor(private configService: ConfigService){}
  configAtual? : Config; 
  simConforto = "";
  simInicio? : Date;
  simFim? : Date;
  calcularCustoDaViagem(){
    this.simInicio = Date.prototype;
    this.simFim = Date.prototype;
    let dif = this.simFim.getTime() - this.simInicio.getTime();
    if(dif <= 0) return;
    this.configService.getConfigs().subscribe(values=>this.configAtual=values);
    
  };
}
