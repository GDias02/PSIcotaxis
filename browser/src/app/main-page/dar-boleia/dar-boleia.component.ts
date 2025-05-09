import { Component, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Pedido } from '../pedido';
import { PedidoService } from '../pedido.service';



@Component({
  selector: 'app-dar-boleia',
  templateUrl: './dar-boleia.component.html',
  styleUrls: ['./dar-boleia.component.css']
})
export class DarBoleiaComponent {
  pedidos: Pedido[] = [];
  
  displayedColumns: string[] = ['moradaDe', 'moradaPara', 'numDePassageiros', 'luxuoso', 'status'];
  dataSource = new MatTableDataSource<Pedido>(this.pedidos);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pedidoService: PedidoService,
  ) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getPedidos(): void {
    this.pedidoService.getPedidosForMotorista().subscribe((pedidos) => {
      this.pedidos = pedidos;
      this.dataSource.data = pedidos;
    });
  }
}
