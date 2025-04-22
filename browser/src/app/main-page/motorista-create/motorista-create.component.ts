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
  anoDeNascimento?: number;
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
    this.motoristaService.addMotorista({nif: this.nif, nome: this.nome, genero: this.genero, anoDeNascimento: new Date(String(this.anoDeNascimento)), cartaDeConducao: this.cartaDeConducao, morada: this.morada} as Motorista)
      .subscribe(() => this.goBack());
  }


  //TODO 
  //Morada needs endpoints in the server
  //The server needs logic to determine what localidade corresponds to what código postal
  //Fix motorista-create component, it needs to be a proper form
  //Motorista-create component calls morada-create's save(),
  //and uses its _id to make a new Motorista
}
