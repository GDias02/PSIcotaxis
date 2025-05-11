import { Component, inject } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-motorista-viagem',
  templateUrl: './motorista-viagem.component.html',
  styleUrls: ['./motorista-viagem.component.css']
})
export class MotoristaViagemComponent {

  private _snackBar = inject(MatSnackBar);
  
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
  custo?: number;

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
    private custoService: CustoService,
    private userService: UserService
  ) {}

  locOrFilled(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (this.locService.isActive() || (value !== '' && value !== undefined)) return null;
      else return { missingFields: true }
    }
  }

  ngOnInit(): void {
      /* this.route.data.subscribe(({ user }) => {
        this.Motorista = user;
        this.getTurno();
      }); */
      this.userService.getCurrentUser().subscribe(user => {
        this.Motorista = user as Motorista;
        this.getTurno();
      })
  }

  getTurno(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.turnoService.getTurno(id!)
      .subscribe((turno: Turno) => {this.turno = turno; this.getPedido()});
  }

  getPedido(): void {
    const id = this.Motorista!._id;
    console.log("MOTORISTA ID = " + id);
    this.pedidoService.getPedidoMotorista(id!)
      .subscribe((pedido: Pedido[]) => this.pedido = pedido[0]);
    /* const id = "6820bdadd728010f7f9e5248";
    this.pedidoService.getPedido(id!)
      .subscribe((pedido: Pedido) => this.pedido = pedido); */
  }

  goBack(): void {
    this.location.back();
  }

  onViagemInit(): void {
    if (this.partidaForm.invalid) return;

    console.log("PEDIDO")
    console.log(this.pedido);
    
    this.seq = this.turno!.viagens.length + 1;
    this.motorista = this.turno!.motorista;
    this.taxi = this.turno!.taxi;
    this.cliente = this.pedido!.cliente;
    this.numDePassageiros = this.pedido!.numDePassageiros;

    if (this.locService.isActive()) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) =>
          this.locService.getMoradaWithLoc(position).subscribe(morada => this.keepFillingViagem(morada)),
        error => {},
        { enableHighAccuracy: true }
      );
    }
    else this.keepFillingViagem({} as Morada);
  }

  keepFillingViagem(morada: Morada) {
    if (morada !== {} as Morada && !this.filled(this.rua_partida) && !this.filled(this.localidade_partida)) {
      this.rua_partida = morada.rua;
      this.localidade_partida = morada.localidade;
      this.partida = morada;
    }
    else this.partida = {rua: this.rua_partida, localidade: this.localidade_partida} as Morada;

    this.inicio = new Date();

    if (!this.between(new Date(this.inicio!), new Date(this.turno!.inicio), new Date(this.turno!.fim))) {
      this.openSnackBar('Não pode começar uma viagem fora do seu turno');
      return;
    }

    this.viagem = {seq: this.seq, motorista: this.motorista, taxi: this.taxi, cliente: this.cliente, numeroDePassageiros: this.numDePassageiros, 
      partida: this.partida, inicio: this.inicio} as Viagem;

    this.iniciar = false;
    this.setClock();
  }

  setClock(): void {
    this.counter = setInterval(() => this.duration++, 1000);
  }

  async onViagemStop() {
    if (this.chegadaForm.invalid) return;

    clearInterval(this.counter!);
    this.fim = new Date();
    this.fim.setMinutes(this.inicio!.getMinutes() + this.duration);

    if (!this.between(new Date(this.fim!), new Date(this.turno!.inicio), new Date(this.turno!.fim))) {
      this.openSnackBar('Não pode terminar uma viagem fora do seu turno');
      return;
    }

    let intersects: boolean = await this.intersects();
    if (intersects) {
      this.openSnackBar('Não pode registar uma viagem enquanto outra está a decorrer');
      return;
    }

    if (this.locService.isActive()) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) =>
          this.locService.getMoradaWithLoc(position).subscribe(morada => this.keepFillingViagemStop(morada)),
        error => {},
        { enableHighAccuracy: true }
      );
    }
    else this.keepFillingViagemStop({} as Morada);
  }

  keepFillingViagemStop(morada: Morada) {
    if (morada !== {} as Morada && !this.filled(this.rua_chegada) && !this.filled(this.localidade_chegada)) {
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
    this.custo = custo;
    this.viagem!.custo = custo;
    console.log("VIAGEM");
    console.log(this.viagem);
    this.viagemService.addViagem(this.viagem!).subscribe(viagem => this.saveTurno(viagem));
  }

  saveTurno(viagem: Viagem): void {
    this.turno!.viagens.push(viagem._id!);
    this.turnoService.updateTurno(this.turno!).subscribe(turno => this.putPedido());
  }

  putPedido(): void {
    this.pedido!.status = "terminado";
    this.pedido!.custo = this.custo;
    this.pedidoService.putPedido(this.pedido!).subscribe(pedido =>
      this.router.navigate(['main-page/motorista/viagens'])
    );
  }

  between(middle: Date, left: Date, right: Date): boolean {
    return left.getTime() <= middle.getTime() && middle.getTime() <= right.getTime();
  }

  async intersects(): Promise<boolean> {
    for (let viagem_id of this.turno!.viagens) {
      let viagem: Viagem | undefined = await this.viagemService.getViagem(viagem_id).toPromise()
      if (this.between(new Date(viagem!.inicio), new Date(this.inicio!), new Date(this.fim!)) 
        || this.between(new Date(viagem!.fim!), new Date(this.inicio!), new Date(this.fim!)))
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  filled(field: string | undefined): boolean {
    return field !== undefined && field !== '';
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Okay', {duration:8500});
  }
}
