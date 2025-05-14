import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { Estatistica } from '../estatistica';
import { ViagemService } from '../viagem.service';
import { Router } from '@angular/router';
import { ViagemCompleta } from '../viagem-completa';

@Component({
  selector: 'app-estatisticas-totais',
  templateUrl: './estatisticas-totais.component.html',
  styleUrls: ['./estatisticas-totais.component.css']
})
export class EstatisticasTotaisComponent implements OnInit {
  viagens: ViagemCompleta[] = [];
  estatisticas: Estatistica[] = [];

  displayedColumns: string[] = ['categoria', 'valor'];

  desde: string = new Date(new Date().setHours(1, 0, 0)).toISOString().slice(0, 16);
  ate: string = new Date(new Date().setHours(24, 59, 59)).toISOString().slice(0, 16);

  estatisticasForm = new FormGroup({
    desde: new FormControl(this.desde, [Validators.required, this.desdeBeforeAte()]),
    ate: new FormControl(this.ate, [Validators.required, this.ateAfterDesde()])
  })

  constructor(
    private location: Location,
    private router: Router,
    private viagemService: ViagemService
  ) {}

  ngOnInit() {
    this.loadViagens();
  }

  desdeBeforeAte(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const desde = control.value;
      if (new Date(desde).getTime() < new Date(this.ate).getTime()) return null;
      else return { desdeBeforeAte: true, ateAfterDesde: true }
    }
  }

  ateAfterDesde(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ate = control.value;
      if (new Date(this.desde).getTime() < new Date(ate).getTime()) return null;
      else return { desdeBeforeAte: true, ateAfterDesde: true }
    }
  }

  updateValidityAte(): void {
    this.estatisticasForm.controls['ate'].updateValueAndValidity();
  }

  updateValidityDesde(): void {
    this.estatisticasForm.controls['desde'].updateValueAndValidity();
  }

  loadViagens(): void {
    this.viagemService.getViagensInInterval(new Date(this.desde), new Date(this.ate)).subscribe(viagens => {
      this.viagens = viagens;
      this.loadStats();
    })
  }

  loadStats(): void {
    const viagens: number = this.computeViagens();
    const horas: number = this.computeHoras();
    const quilometros: number = this.computeQuilometros();

    this.estatisticas = [
      {
        categoria: "Número de Viagens",
        valor: viagens
      },
      {
        categoria: "Horas de Viagens",
        valor: horas
      },
      {
        categoria: "Quilómetros Percorridos",
        valor: quilometros
      },
    ]
  }

  computeViagens(): number {
    return this.viagens.length;
  }

  computeHoras(): number {
    let horas: number = 0;
    for (const viagem of this.viagens) {
      horas += (viagem.fim!.getTime() - viagem.inicio.getTime()) / (3600 * 1000);
    }
    return horas;
  }

  computeQuilometros(): number {
    let quilometros: number = 0;
    for (const viagem of this.viagens) {
      quilometros += viagem.kilometros!;
    }
    return quilometros;
  }

  onSubmit(): void {
    if (this.estatisticasForm.invalid) return;
    this.loadViagens();
  }

  goBack(): void {
    this.location.back();
  }

  showSubTotal(row: Estatistica): void {
    this.router.navigate([`main-page/estatisticas/subtotal`], { state: { categoria: row.categoria, viagens: this.viagens } });
  }
}
