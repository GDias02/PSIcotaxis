import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Viagem } from '../viagem';
import { ViagemService } from '../viagem.service';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']
})
export class ViagensComponent {
  viagens: Viagem[] = [];
  
    displayedColumns: string[] = [];
    dataSource = this.viagens;
  
    constructor(
      private viagemService: ViagemService,
      private readonly router: Router,
      public datePipe: DatePipe
    ) {}
  
    ngOnInit(): void {
      this.getViagens();
    }
  
    getViagens(): void {
      this.viagemService.getViagens()
          .subscribe(viagens => this.viagens = viagens);
    }
  
    showViagemCreate() {
      //this.router.navigate([`${this.router.url}/create`]);
    }

    showViagemPlan() {
      this.router.navigate([`${this.router.url}/custo`]);
    }
  
    showViagemDetail(row: Viagem) {
      //this.router.navigate([`${this.router.url}/${row._id}`]);
    }
  
    delete(viagem: Viagem): void {
      this.viagens = this.viagens.filter(v => v !== viagem)
      this.viagemService.deleteViagem(viagem._id!).subscribe();
    }
}
