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
import { LocService } from '../loc.service';
import { Morada } from '../morada';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  user?: Motorista;
  pedidos: Pedido[] = [];
  pedido?: Pedido;
  turno?: Turno;
  errors: any = { naoEstaEmTurno: false }

  counter: any;

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
    public datePipe: DatePipe,
    private locService: LocService
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
        this.locService.getMorada().subscribe(morada => this.fillPedido(p, t[0], morada))
      } else {
        this.errors.naoEstaEmTurno = true;
        this.openSnackBar("De momento não tem nenhum turno registado!", "Ok");
      }
    });
  }

  fillPedido(p: Pedido, t: Turno, morada: Morada): void {
    p.taxi = t["taxi"];
    p.motorista = t["motorista"];
    p.moradaMotorista = morada;
    p.status = 'aceite';
    this.turno = t;
    console.log(p);
    this.pedidoService.putPedido(p).subscribe(out => {
      this.pedido = p;
      this.pedidoService.getPedidosPendentes()
        .subscribe(t => {
          this.pedidos = t;
          this.dataSource.data = t;
        })
    });
  }

  waitClienteConfirmation(): void {
    this.counter = setInterval(() => this.checkStatusPedido(), 10 * 1000);
  }

  checkStatusPedido() {
    this.pedidoService.getPedido(this.pedido!._id).subscribe(pedido => {
      this.pedido = pedido;
      if (this.pedido.status === 'rejeitado') {
        clearInterval(this.counter);
        this.openSnackBar("Cliente rejeitou o pedido", "OK");
      }
      if (this.pedido.status === 'confirmado') {
        clearInterval(this.counter);
        this.router.navigate([`main-page/turnos/${this.turno!._id}/viagem`]);
      }
    })
  }
}
