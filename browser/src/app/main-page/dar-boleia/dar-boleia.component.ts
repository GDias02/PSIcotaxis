import { Component, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Pedido } from '../pedido';
import { PedidoService } from '../pedido.service';
import { LocService } from '../loc.service';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-dar-boleia',
  templateUrl: './dar-boleia.component.html',
  styleUrls: ['./dar-boleia.component.css']
})
export class DarBoleiaComponent {
  pedidos: Pedido[] = [];
  distancias: Map<string, number> = new Map();
  
  displayedColumns: string[] = ['moradaDe', 'moradaPara', 'numDePassageiros', 'distância', 'luxuoso'];
  dataSource = new MatTableDataSource<Pedido>(this.pedidos);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pedidoService: PedidoService,
    private locService: LocService,
  ) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    // Add custom sorting logic for distância
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      if (sortHeaderId === 'distância') {
        // Retrieve the distance from the distancias map
        return this.distancias.get(data._id) || 0; // Default to 0 if no distance is found
      }
      // Default sorting for other columns
      return (data as any)[sortHeaderId];
    };
    
  }

  async getPedidos(): Promise<void> {
    const pedidos = await firstValueFrom(this.pedidoService.getPedidosForMotorista());
    this.pedidos = pedidos;
    this.dataSource.data = pedidos;
  
    // Calculate the distance for each pedido
    for (const pedido of pedidos) {
      const latitudeDe = parseFloat(pedido.coordenadasDe.split(",")[0]);
      const longitudeDe = parseFloat(pedido.coordenadasDe.split(",")[1]);
      const latitudePara = parseFloat(pedido.coordenadasPara.split(",")[0]);
      const longitudePara = parseFloat(pedido.coordenadasPara.split(",")[1]);
  
      const distance = this.locService.getDistance(latitudeDe, longitudeDe, latitudePara, longitudePara);
      
      const duration = distance * 4;
      
      this.distancias.set(pedido._id, duration);
    }
  }
}
