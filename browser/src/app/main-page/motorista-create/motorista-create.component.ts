import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';

@Component({
  selector: 'app-motorista-create',
  templateUrl: './motorista-create.component.html',
  styleUrls: ['./motorista-create.component.css']
})
export class MotoristaCreateComponent {
  nif?: number;
  nome?: string;
  genero?: string;
  anoDeNascimento?: Date;
  cartaDeConducao?: string;
  morada?: string;

  constructor(
    private route: ActivatedRoute,
    private motoristaService: MotoristaService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log(this.nome);
    console.log(this.nif);
    console.log(this.genero);
    console.log(this.anoDeNascimento);
    console.log(this.cartaDeConducao);
    console.log(this.morada);
    this.motoristaService.addMotorista({nif: this.nif, nome: this.nome, genero: this.genero, anoDeNascimento: this.anoDeNascimento, cartaDeConducao: this.cartaDeConducao, morada: this.morada} as Motorista)
      .subscribe(() => this.goBack());
  }

  allFilled(): boolean {
    return this.nome !== undefined && this.nif !== undefined &&
      this.genero !== undefined && this.anoDeNascimento !== undefined &&
      this.cartaDeConducao !== undefined && this.morada !== undefined
  }
}
