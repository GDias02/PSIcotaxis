import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PedidoCreateFormComponent } from '../pedido-create-form/pedido-create-form.component';

import { Pedido } from '../pedido';
import { Cliente } from '../cliente';

import { PedidoService } from '../pedido.service';
import { ClienteService } from '../cliente.service';
import { firstValueFrom } from 'rxjs';
import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';
import { TaxiService } from '../taxi.service';
import { Taxi } from '../taxi';
import { LocService } from '../loc.service';
import { CustoService } from '../custo.service';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.css']
})
export class PedidoCreateComponent implements OnInit{
  private _formBuilder = inject(FormBuilder);
  @ViewChild('pedidoForm') pedidoForm!: PedidoCreateFormComponent;
  pedido!: Pedido;

  counter: any;
  motorista?: Motorista;
  taxi?: Taxi;
  distance?: number;
  duration?: number;
  durationToObjective?: number;
  custo?: number;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private motoristaService: MotoristaService,
    private taxiService: TaxiService,
    private locService: LocService,
    private custoService: CustoService,
    public datePipe: DatePipe,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ){}

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });
  isLinear = true;

  ngOnInit() {
    console.log(this.pedidoForm);
  }
  
  /**
   * Faz um POST do pedido e avança o Stepper para o passo 2
   * se o pedido for criado com sucesso.
   */
  async complete1stStep(): Promise<void> {
    this.pedidoForm.makeSureThereAreCoordinates();
    let pedido = await this.pedidoForm.getPedido()
    
    console.log("Trying to do this")
    console.log(pedido)
    /**Post Pedido  */
    pedido = await firstValueFrom(this.pedidoService.postPedido(pedido));

    if (!pedido){
      //There was an error
      console.error('Error creating pedido:', pedido);
      alert('Ocorreu um erro na criação do pedido, tentar novamente.');
    } else {
      this.pedido = pedido;
      this.showStep2(); 
    }

  }

  get isFirstStepValid() : boolean {
    return this.pedidoForm?.isReadyToSubmit() ?? false;
  }

  showStep2(): void {
    const step1Element = document.getElementById('step1');
    if (step1Element) {
      step1Element.style.display = "None";
    }
    
    const step2Element = document.getElementById("step2");
    if (step2Element) {
      step2Element.style.display = "block";
    }
    this.waitMotoristaConfirmation();
  }

  waitMotoristaConfirmation(): void {
    this.counter = setInterval(() => this.checkMotoristaInPedido(), 10 * 1000);
  }

  checkMotoristaInPedido() {
    this.pedidoService.getPedido(this.pedido._id).subscribe(pedido => {
      this.pedido = pedido;
      if (this.pedido.motorista !== undefined && this.pedido.motorista !== '') {
        clearInterval(this.counter);
        this.motoristaService.getMotorista(this.pedido.motorista).subscribe(motorista => {
          this.motorista = motorista;
          this.taxiService.getTaxi(this.pedido.taxi!).subscribe(taxi => {
            this.taxi = taxi;
            this.locService.getDurationDistance(this.pedido.moradaMotorista!, this.pedido.moradaDe).subscribe(dist_dur => {
              this.distance = dist_dur[0];
              this.duration = dist_dur[1];
              this.locService.getDuration(this.pedido.moradaDe, this.pedido.moradaPara).subscribe(duration => {
                this.durationToObjective = duration;
                console.log("DURATION = " + this.duration);
                console.log("DURATION TO OBJECTIVE = " + this.durationToObjective);
                const inicio = new Date();
                inicio.setMinutes(inicio.getMinutes() + this.duration!);
                console.log("INICIO");
                console.log(inicio);
                const fim = new Date();
                fim.setMinutes(fim.getMinutes() + this.duration! + this.durationToObjective!);
                console.log("FIM");
                console.log(fim);
                this.custoService.calcularCustoViagem(inicio.toLocaleString(), fim.toLocaleString(), this.taxi!.conforto).subscribe(custo => {
                  this.custo = custo;
                  console.log("CONFORTO = " + this.taxi!.conforto)
                  console.log("CUSTO = " + this.custo);
                  console.log("PROCEED TO STEP 3? " + this.canLoadStep3());
                  this.showStep3();
                })
              })
            })
          })
        })
      }
    })
  }

  showStep3(): void {
    const step2Element = document.getElementById('step2');
    if (step2Element) {
      step2Element.style.display = "None";
    }
    
    const step3Element = document.getElementById("step3");
    console.log("STEP 3");
    console.log(step3Element);
    console.log("VOU METER O STEP 3");
    step3Element!.style.display = "block";
  }

  rejeitar(): void {
    this.pedido.status = "rejeitado";
    this.pedidoService.putPedido(this.pedido).subscribe(pedido => {
      this.location.back();
    })
  }

  aceitar(): void {
    this.pedido.status = "confirmado";
    this.pedidoService.putPedido(this.pedido).subscribe(pedido => {
      this.pedido = pedido;
      this.showStep4();
    })
  }

  showStep4(): void {
    const step1Element = document.getElementById('step3');
    if (step1Element) {
      step1Element.style.display = "None";
    }
    
    const step2Element = document.getElementById("step4");
    if (step2Element) {
      step2Element.style.display = "block";
    }
    this.waitViagemEnd();
  }

  waitViagemEnd(): void {
    this.counter = setInterval(() => this.checkCustoInPedido(), 10 * 1000);
  }

  checkCustoInPedido() {
    this.pedidoService.getPedido(this.pedido._id).subscribe(pedido => {
      this.pedido = pedido;
      if (this.pedido.custo !== undefined) {
        clearInterval(this.counter);
        this.showStep5();
      }
    })
  }

  showStep5(): void {
    const step1Element = document.getElementById('step4');
    if (step1Element) {
      step1Element.style.display = "None";
    }
    
    const step2Element = document.getElementById("step5");
    if (step2Element) {
      step2Element.style.display = "block";
    }
  }

  goBack(): void {
    this.pedidoService.deletePedido(this.pedido._id).subscribe(pedido => this.location.back());
  }

  canLoadStep3(): boolean {
    return this.motorista !== undefined && this.motorista.nome !== undefined &&
      this.distance !== undefined && this.duration !== undefined && this.custo !== undefined &&
      this.taxi !== undefined;
  }

  canLoadStep5(): boolean {
    return this.pedido !== undefined && this.pedido.custo !== undefined;
  }
}
