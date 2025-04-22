import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';
import { Morada } from '../morada';
import { MoradaService } from '../morada.service';
import { MoradaCreateComponent } from '../morada-create/morada-create.component';
import { ReadKeyExpr } from '@angular/compiler';

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
    private location: Location,
    private moradaService: MoradaService
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // Create morada and with it's id, create motorista
    this.moradaService.addMorada({
      rua: this.moradaComponent?.rua ?? '',
      codigo_postal: this.moradaComponent?.codPostal.value ?? '',
      localidade: this.moradaComponent?.localidade ?? ''
    } as Morada).subscribe({
      next: (morada) => {
        console.log('Created Morada:', morada);
        console.log('Use it for Motorista creation');
        this.motoristaService.addMotorista({
          nif: this.nif,
          nome: this.nome,
          genero: this.genero,
          anoDeNascimento: this.dataDeNascimento,
          cartaDeConducao: this.cartaDeConducao,
          morada: morada._id
        } as Motorista).subscribe({
          next: (motorista) => {
            console.log('Created Motorista:', motorista);
            this.goBack();
          },
          error: (err) => {
            console.error('Error creating motorista:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error creating morada, no motorista was created:', err);
      }
    })
    
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
