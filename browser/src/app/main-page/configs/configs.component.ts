import { Component } from '@angular/core';

import { Config } from '../config';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.css']
})
export class ConfigsComponent {
  configs?: Config;
  ppm_basico?: number;
  ppm_luxuoso?: number;
  agravamento?: number;
  
  constructor(private configService: ConfigService) {}
  
  ngOnInit(): void {
    this.getConfigs();
  }
  
  getConfigs(): void {
    this.configService.getConfigs()
        .subscribe(configs => this.prepareConfig(configs));
  }

  prepareConfig(configs: Config): void {
    this.configs = configs;
    this.ppm_basico = configs.ppm_basico;
    this.ppm_luxuoso = configs.ppm_luxuoso;
    this.agravamento = configs.agravamento;
  }

  allFilled(): boolean {
    return this.ppm_basico !== undefined && String(this.ppm_basico) !== '' &&
      this.ppm_luxuoso !== undefined && String(this.ppm_luxuoso) !== '' &&
      this.agravamento !== undefined && String(this.agravamento) !== '';
  }

  save(): void {
    this.configService.updateConfig({_id: this.configs!._id, ppm_basico: this.ppm_basico, ppm_luxuoso: this.ppm_luxuoso, agravamento: this.agravamento} as Config)
      .subscribe(configs => this.prepareConfig(configs));
  }
}
