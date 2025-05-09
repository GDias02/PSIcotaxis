import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import { Turno } from '../turno';
import { TurnoService } from '../turno.service';
import { Motorista } from '../motorista';
import { PedidoService } from '../pedido.service';
import { Pedido } from '../pedido';
import { Viagem } from '../viagem';
import { Morada } from '../morada';
import { LocService } from '../loc.service';
import { ViagemService } from '../viagem.service';
import { CustoService } from '../custo.service';

@Component({
  selector: 'app-motorista-viagem',
  templateUrl: './motorista-viagem.component.html',
  styleUrls: ['./motorista-viagem.component.css']
})
export class MotoristaViagemComponent {
  
  Motorista?: Motorista;
  turno?: Turno;
  pedido?: Pedido;
  viagem?: Viagem;

  counter?: any;
  duration: number = 0;

  rua_partida?: string;
  localidade_partida?: string;

  rua_chegada?: string;
  localidade_chegada?: string;

  seq?: number;
  motorista?: string;
  taxi?: string;
  cliente?: string;
  numDePassageiros?: number;
  partida?: Morada;
  chegada?: Morada;
  inicio?: Date
  fim?: Date;

  iniciar: boolean = true;

  partidaForm = new FormGroup({
    rua_partida: new FormControl('', [this.locOrFilled()]),
    localidade_partida: new FormControl('', [this.locOrFilled()])
  });

  chegadaForm = new FormGroup({
    rua_chegada: new FormControl('', [this.locOrFilled()]),
    localidade_chegada: new FormControl('', [this.locOrFilled()])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private turnoService: TurnoService,
    private pedidoService: PedidoService,
    private location: Location,
    public datePipe: DatePipe,
    private locService: LocService,
    private viagemService: ViagemService,
    private custoService: CustoService
  ) {
    this.route.data.subscribe(({ user }) => this.motorista = user);
  }

  locOrFilled(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (this.locService.isActive() || value !== '') return null;
      else return { missingFields: true }
    }
  }

  ngOnInit(): void {
    this.getTurno();
  }

  getTurno(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.turnoService.getTurno(id!)
      .subscribe((turno: Turno) => {this.turno = turno; this.getPedido()});
  }

  getPedido(): void {
    const id = this.Motorista!._id;
    this.pedidoService.getPedido(id!)
      .subscribe((pedido: Pedido) => this.pedido = pedido);
  }

  goBack(): void {
    this.location.back();
  }

  onViagemInit(): void {
    if (this.partidaForm.invalid) return;
    
    this.seq = this.turno!.viagens.length + 1;
    this.motorista = this.turno!.motorista;
    this.taxi = this.turno!.taxi;
    this.cliente = this.pedido!.cliente;
    this.numDePassageiros = this.pedido!.numDePassageiros;

    this.locService.getMorada().subscribe(morada => this.keepFillingViagem(morada));
  }

  keepFillingViagem(morada: Morada) {
    if (morada !== {} as Morada) {
      this.rua_partida = morada.rua;
      this.localidade_partida = morada.localidade;
      this.partida = morada;
    }
    else this.partida = {rua: this.rua_partida, localidade: this.localidade_partida} as Morada;

    this.inicio = new Date();

    this.viagem = {seq: this.seq, motorista: this.motorista, taxi: this.taxi, cliente: this.cliente, numeroDePassageiros: this.numDePassageiros, 
      partida: this.partida, inicio: this.inicio} as Viagem;

    this.iniciar = false;
    this.setClock();
  }

  setClock(): void {
    this.counter = setInterval(() => this.duration++, 60 * 1000);
  }

  onViagemStop(): void {
    if (this.chegadaForm.invalid) return;

    clearInterval(this.counter!);
    this.fim = new Date();
    this.fim.setMinutes(this.inicio!.getMinutes());
    this.locService.getMorada().subscribe(morada => this.keepFillingViagemStop(morada));
  }

  keepFillingViagemStop(morada: Morada) {
    if (morada !== {} as Morada) {
      this.rua_chegada = morada.rua;
      this.localidade_chegada = morada.localidade;
      this.chegada = morada;
    }
    else this.chegada = {rua: this.rua_chegada, localidade: this.localidade_chegada} as Morada;

    this.viagem!.fim = this.fim;
    this.viagem!.chegada = this.chegada;

    this.locService.getDurationDistance(this.viagem!.partida, this.viagem!.chegada)
      .subscribe(distance_duration => this.updateDistance(distance_duration[0], distance_duration[1]));
  }

  updateDistance(distance: number, duration: number): void {
    this.viagem!.kilometros = distance;
    this.custoService.calcularCustoViagem(this.viagem!.inicio.toLocaleString(), this.viagem!.fim!.toLocaleString(), this.pedido!.luxuoso ? "luxuoso" : "basico")
      .subscribe(custo => this.saveViagem(custo));
  }

  saveViagem(custo: number): void {
    this.viagem!.custo = custo;
    this.viagemService.addViagem(this.viagem!).subscribe(viagem => this.saveTurno(viagem));
  }

  saveTurno(viagem: Viagem): void {
    this.turno!.viagens.push(viagem._id!);
    this.turnoService.updateTurno(this.turno!).subscribe(turno => this.deletePedido());
  }

  deletePedido(): void {
    this.pedidoService.deletePedido(this.pedido!._id).subscribe();
    this.router.navigate(['motorista/viagens']);
  }
}
