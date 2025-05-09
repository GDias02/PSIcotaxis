import { Component, inject, signal } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MotoristaService } from '../motorista.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MessageService } from '../message.service';
import { Taxi } from '../taxi';
import { MatStepper } from '@angular/material/stepper';
import { TurnoService } from '../turno.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/user.service';
import { Motorista } from '../motorista';
import { Turno } from '../turno';

@Component({
  selector: 'app-turno-create',
  templateUrl: './turno-create.component.html',
  styleUrls: ['./turno-create.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true },
  }]
})
export class TurnoCreateComponent {
  private _formBuilder = inject(FormBuilder);

  now: string = new Date().toISOString().slice(0, 16);
  inicio: string = this.now;
  fim: string = this.now;
  errors: any = { fimBeforeInicio: false, turnoMaisDeOito: false, intersetaOutroTurno: false }

  turnosRegistados: Turno[] = [];

  displayedColumns: string[] = ['marca', 'conforto', 'anoDeCompra'];
  taxis: Taxi[] = [];
  taxiSelecionado?: Taxi;

  firstFormGroup = new FormGroup({
    inicio: new FormControl(new Date(this.inicio), [Validators.required, this.inicioBeforeFim()]),
    fim: new FormControl(new Date(this.fim), [Validators.required, this.fimAfterInicio(), this.turnoMaximoOitoHoras(), this.turnoNaoInterceta()])
  });
  secondFormGroup = new FormGroup({
    secondCtrl: new FormControl('', [this.selecionouTaxi()])
  });
  user?: Motorista;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private turnoService: TurnoService,
    private location: Location,
    public datePipe: DatePipe
  ) {
    this.activatedRoute.data.subscribe(({ user }) => {
      this.user = user;
    });
    this.getTurnosRegistados();
  }

  getTaxisDisponiveis(): void {
    this.turnoService.getTaxisDisponiveis(this.inicio, this.fim)
      .subscribe(taxis => {
        this.taxis = taxis;
      });
  }

  inicioBeforeFim(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inicio = control.value;
      if (inicio < this.fim!) {
        this.errors!.fimBeforeInicio = false;
        return null;
      }
      else {
        this.errors!.fimBeforeInicio = true;
        return { inicioBeforeFim: true }
      }
    }
  }

  turnoNaoInterceta(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fim = control.value;
      if (!this.intersetaAlgumTurno(new Date(this.inicio), new Date(this.fim))) {
        this.errors!.intersetaOutroTurno = false;
        return null;
      }
      else {
        this.errors!.intersetaOutroTurno = true;
        return { turnoNaoInterceta: true }
      }
    }
  }

  intersetaAlgumTurno(s1: Date, e1: Date): boolean {
    for(let t of this.turnosRegistados){
      if(new Date(t.inicio) <= e1 && new Date(t.fim) >= s1){
        return true;
      }
    }
    return false;
  }

  selecionouTaxi(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.taxis.includes(this.taxiSelecionado!)) {
        return null;
      } else {
        return { taxiNaoSelecionado: true }
      }
    }
  }

  fimAfterInicio(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fim = control.value;
      if (this.inicio! < fim) {
        this.errors!.fimBeforeInicio = false;
        return null;
      }
      else {
        this.errors!.fimBeforeInicio = true;
        return { fimAfterInicio: true }
      }
    }
  }

  turnoMaximoOitoHoras(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fim = control.value;
      if (new Date(this.inicio!).getTime() >= new Date(fim).getTime() - (8 * 36e5)) {
        this.errors!.turnoMaisDeOito = false;
        return null;
      }
      else {
        this.errors!.turnoMaisDeOito = true;
        return { turnoMaximoOitoHoras: true }
      }
    }
  }

  getTurnosRegistados(): void {
    this.turnoService.getTurnosDeMotorista(this.user!._id)
      .subscribe(t => {
        this.turnosRegistados = t;
      });
  }



  updateValidityFim(): void {
    this.firstFormGroup.controls['fim'].updateValueAndValidity();
  }

  updateValidityTaxiEscolhido(): void {
    this.secondFormGroup.controls['secondCtrl'].updateValueAndValidity();
  }

  updateValidityInicio(): void {
    this.firstFormGroup.controls['inicio'].updateValueAndValidity();
  }

  onNext(stepper: MatStepper) {
    this.getTaxisDisponiveis();
    stepper.next();
  }

  selected(t: Taxi) {
    this.taxiSelecionado = t;
    this.updateValidityTaxiEscolhido();
  }

  onFinish(stepper: MatStepper) {
    console.log("selecionou o taxi:");
    console.log(this.taxiSelecionado);
    console.log("o senhor motorista:");
    console.log(this.user);
    stepper.next();
  }

  taxiMarcaModelo(): string {
    return this.taxiSelecionado!.marca + " " + this.taxiSelecionado!.modelo;
  }

  save(): void {
    this.turnoService.addTurno({
      motorista: this.user!._id,
      taxi: this.taxiSelecionado?._id,
      viagens: [],
      inicio: this.inicio,
      fim: this.fim
    } as unknown as Turno).subscribe({
      next: (turno) => {
        if (turno.name !== "HttpErrorResponse") {
          console.log('Created Turno:', turno);
          this.goBack();
        } else {
          //There was a specific error
          const error = turno.error;
          console.log('Error creating turno', error);
          /*
          if (error.code === 11000) {
            this.showErrors(Object.keys(error.keyPattern));
          }
            */
        }
      }
    });
  }
    goBack(): void {
    this.location.back();
  }
    showErrors(controlNames: string[]) {
    for (let cname of controlNames) {
      /*
      switch (cname) {
        case "matricula": this. = true; this.taxiForm.controls["matricula"].updateValueAndValidity(); break;
      }
        */
      this.messageService.add(`${cname} já existe na base de dados`);
    }
  }
}
