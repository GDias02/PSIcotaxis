import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ViagemCompleta } from '../viagem-completa';
import { Motorista } from '../motorista';
import { Taxi } from '../taxi';

interface EstatisticasMotorista {
  _id: string;
  nome: string;
  nif: number;
  total: any;
}

interface EstatisticasTaxi {
  _id: string;
  marcamodelo: string;
  matricula: string;
  total: any;
}

@Component({
  selector: 'app-estatisticas-subtotais',
  templateUrl: './estatisticas-subtotais.component.html',
  styleUrls: ['./estatisticas-subtotais.component.css']
})
export class EstatisticasSubtotaisComponent implements OnInit {
  viagens: ViagemCompleta[] = [];

  motoristaIDs_motorista: Map<string, Motorista>  = new Map();     //uma chave para cada id único e o valor é o motorista correspondente
  motoristaIDs_viagens: Map<string, ViagemCompleta[]> = new Map(); //uma chave para cada id único e o valor é as viagens desse motorista
  taxiIDs_taxi: Map<string, Taxi>  = new Map();                    //uma chave para cada id único e o valor é o taxi correspondente
  taxiIDs_viagens: Map<string, ViagemCompleta[]> = new Map();      //uma chave para cada id único e o valor é as viagens desse taxi

  estatisticasMotoristas: EstatisticasMotorista[] = [];
  estatisticasTaxis: EstatisticasTaxi[] = [];

  displayedColumnsMotorista: string[] = ['nome', 'nif', 'total', 'detalhes'];
  displayedColumnsTaxi: string[] = ['marcamodelo', 'matricula', 'total', 'detalhes'];

  tipo: string = "motoristas";
  categoria?: string;

  constructor(
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = window.history.state;
    this.categoria = state['categoria'];
    this.viagens = state['viagens'];
    this.loadTable();
  }

  loadTable(): void {
    this.motoristaIDs_viagens = this.viagens.reduce((acc: Map<string, ViagemCompleta[]>, current: ViagemCompleta) => {
      let viagens = acc.get(current.motorista._id);
      if (viagens === undefined) {
        acc.set(current.motorista._id, [current]);
        this.motoristaIDs_motorista.set(current.motorista._id, current.motorista);
      }
      else
        viagens.push(current);
      return acc;
    }, new Map());

    //mesma lógica para táxis

    this.fillEstatisticas();
  }

  fillEstatisticas(): void {
    switch (this.categoria) {
      case "Número de Viagens": this.computeViagens(); break;
      case "Horas de Viagens": this.computeHoras(); break;
      case "Quilómetros Percorridos": this.computeQuilometros(); break;
    }
  }

  computeViagens(): void {
    this.motoristaIDs_viagens.forEach((viagens: ViagemCompleta[], id: string) => {
      let motorista: Motorista = this.motoristaIDs_motorista.get(id)!;
      this.estatisticasMotoristas.push(
        {
          _id: id,
          nome: motorista.nome,
          nif: motorista.nif,
          total: this.getViagens(viagens)
        }
      )
    });

    //mesma lógica para táxis
  }

  getViagens(viagens: ViagemCompleta[]): number {
    return viagens.length;
  }

  computeHoras(): void {
    this.motoristaIDs_viagens.forEach((viagens: ViagemCompleta[], id: string) => {
      let motorista: Motorista = this.motoristaIDs_motorista.get(id)!;
      this.estatisticasMotoristas.push(
        {
          _id: id,
          nome: motorista.nome,
          nif: motorista.nif,
          total: this.getHoras(viagens)
        }
      )
    });

    //mesma lógica para táxis
  }

  getHoras(viagens: ViagemCompleta[]): number {
    let horas: number = 0;
    for (const viagem of viagens) {
      horas += (viagem.fim!.getTime() - viagem.inicio.getTime()) / (3600 * 1000);
    }
    return horas;
  }

  computeQuilometros(): void {
    this.motoristaIDs_viagens.forEach((viagens: ViagemCompleta[], id: string) => {
      let motorista: Motorista = this.motoristaIDs_motorista.get(id)!;
      this.estatisticasMotoristas.push(
        {
          _id: id,
          nome: motorista.nome,
          nif: motorista.nif,
          total: this.getQuilometros(viagens)
        }
      )
    });

    //mesma lógica para táxis
  }

  getQuilometros(viagens: ViagemCompleta[]): number {
    let quilometros: number = 0;
    for (const viagem of viagens) {
      quilometros += viagem.kilometros!;
    }
    return quilometros;
  }

  goBack(): void {
    this.location.back();
  }

  showDetailsMotorista(motorista: EstatisticasMotorista): void {
    this.router.navigate([`main-page/motoristas/${motorista._id}`]);
  }

  showDetailsViagensMotorista(row: EstatisticasMotorista): void {
    this.router.navigate([`main-page/estatisticas/details`], { state: { categoria: this.categoria, viagens: this.motoristaIDs_viagens.get(row._id) } });
  }
}
