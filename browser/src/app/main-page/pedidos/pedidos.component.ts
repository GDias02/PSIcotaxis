import { Component, inject } from '@angular/core';
import { Pedido } from '../pedido';
import { Motorista } from '../motorista';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnoService } from '../turno.service';
import { DatePipe } from '@angular/common';
import { PedidoService } from '../pedido.service';
import { Turno } from '../turno';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  user?: Motorista;
  pedidos: Pedido[] = [];
  errors: any = { naoEstaEmTurno: false }

  displayedColumns: string[] = ['morada_origem', 'morada_destino', 'luxuoso', 'passageiros', 'atender'];
  dataSource = new MatTableDataSource<Pedido>(this.pedidos);

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private pedidoService: PedidoService,
    private turnoService: TurnoService,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ user }) => {
      this.pedidoService.getPedidosPendentes()
        .subscribe(t => {
          this.pedidos = t;
          this.dataSource.data = t;
        });
      this.user = user;
    });
  }

  atenderPedido(p: Pedido) {
    this.turnoService.getTurnoAtual(this.user!._id, new Date().toISOString()).subscribe(t => {
      if (t.length > 0) {
        p.taxi = t[0]["taxi"];
        p.motorista = t[0]["motorista"];
        p.status = 'aceite';
        console.log(p);
        this.pedidoService.putPedido(p).subscribe(out =>
          this.pedidoService.getPedidosPendentes()
            .subscribe(t => {
              this.pedidos = t;
              this.dataSource.data = t;
            })
        );

      } else {
        this.errors.naoEstaEmTurno = true;
        this.openSnackBar("De momento não tem nenhum turno registado!", "Ok");
      }
    });

  }
}
