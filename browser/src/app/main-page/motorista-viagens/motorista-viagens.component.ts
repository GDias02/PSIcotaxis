import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Viagem } from '../viagem';
import { ViagemService } from '../viagem.service';
import { Motorista } from '../motorista';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-motorista-viagens',
  templateUrl: './motorista-viagens.component.html',
  styleUrls: ['./motorista-viagens.component.css']
})
export class MotoristaViagensComponent {
  motorista?: Motorista;
  viagens: Viagem[] = [];
  
  displayedColumns: string[] = ['taxi', 'partida', 'chegada', 'inicio', 'fim'];
  dataSource = new MatTableDataSource<Viagem>(this.viagens);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private viagemService: ViagemService,
    private readonly router: Router,
    private route: ActivatedRoute,
    public datePipe: DatePipe
  ) {
    this.route.data.subscribe(({ user }) => this.motorista = user);
  }

  ngOnInit(): void {
    this.getViagens();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;

    setTimeout(() => {
      this.sort.active = 'inicio';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit();
    });
  }

  getViagens(): void {
    this.viagemService.getViagensMotorista(this.motorista!._id)
        .subscribe(viagens => this.viagens = viagens);
  }

  showViagemDetail(row: Viagem) {
    //this.router.navigate([`${this.router.url}/${row._id}`]);
  }
}
