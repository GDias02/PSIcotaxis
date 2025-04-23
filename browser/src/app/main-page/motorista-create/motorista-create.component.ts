import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';
import { Morada } from '../morada';
import { MoradaCreateComponent } from '../morada-create/morada-create.component';


@Component({
  selector: 'app-motorista-create',
  templateUrl: './motorista-create.component.html',
  styleUrls: ['./motorista-create.component.css']
})
export class MotoristaCreateComponent {
  nif?: number;
  nome?: string;
  genero?: string;
  dataDeNascimento?: Date;
  cartaDeConducao?: string;
  @ViewChild(MoradaCreateComponent) moradaComponent?: MoradaCreateComponent;

  constructor(
    private route: ActivatedRoute,
    private motoristaService: MotoristaService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.motoristaService.addMotorista({
      nif: this.nif,
      nome: this.nome,
      genero: this.genero,
      anoDeNascimento: this.dataDeNascimento,
      cartaDeConducao: this.cartaDeConducao,
      morada: {
        rua: this.moradaComponent?.rua,
        codigo_postal: this.moradaComponent?.codPostal?.value,
        localidade: this.moradaComponent?.localidade
      } as Morada
    } as Motorista).subscribe({
      next: (motorista) => {
        console.log('Created Motorista:', motorista);
        this.goBack();
      },
      error: (err) => {
        console.error('Error creating motorista:', err);
      }
    });
  }
  
  allFilled(): boolean {
    const morada = this.moradaComponent?.allFilled() ?? false;
    return this.nome !== undefined && this.nome !== '' &&
            this.nif !== undefined &&
            this.genero !== undefined &&
            this.dataDeNascimento !== undefined &&
            this.cartaDeConducao !== undefined && this.cartaDeConducao !== '' &&
            morada;
  }


}
