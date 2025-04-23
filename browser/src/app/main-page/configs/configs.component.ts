import { Component } from '@angular/core';

import { Config } from '../config';
import { ConfigService } from '../config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  configForm = new FormGroup({
    ppm_basico: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(100)]),
    ppm_luxuoso: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(100)]),
    agravamento: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
  })
  
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

  onSubmit() {
    if (this.configForm.invalid) return;
    this.save();
  }

  save(): void {
    this.configService.updateConfig({_id: this.configs!._id, ppm_basico: this.ppm_basico, ppm_luxuoso: this.ppm_luxuoso, agravamento: this.agravamento} as Config)
      .subscribe(configs => this.prepareConfig(configs));
  }
}
