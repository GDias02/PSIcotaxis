import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-motorista',
  templateUrl: './painel-motorista.component.html',
  styleUrls: ['./painel-motorista.component.css',]
})
export class PainelMotoristaComponent implements OnInit {
  motorista: any;

  ngOnInit(): void {
    const dados = localStorage.getItem('motorista');
    this.motorista = dados ? JSON.parse(dados) : null;
  }
}
