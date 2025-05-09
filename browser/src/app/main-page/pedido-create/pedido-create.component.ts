import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PedidoCreateFormComponent } from '../pedido-create-form/pedido-create-form.component';

import { Pedido } from '../pedido';
import { Cliente } from '../cliente';

import { PedidoService } from '../pedido.service';
import { ClienteService } from '../cliente.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.css']
})
export class PedidoCreateComponent implements OnInit{
  private _formBuilder = inject(FormBuilder);
  @ViewChild('pedidoForm') pedidoForm!: PedidoCreateFormComponent;
  private pedido!: Pedido;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService
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

  }
}
