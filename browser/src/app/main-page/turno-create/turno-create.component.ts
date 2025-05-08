import { Component, inject } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MotoristaService } from '../motorista.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { Taxi } from '../taxi';
import { MatStepper } from '@angular/material/stepper';
import { TurnoService } from '../turno.service';
import { DatePipe } from '@angular/common';

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
  errors: any = {fimBeforeInicio: false, turnoMaisDeOito: false }

  displayedColumns: string[] = ['marca', 'conforto', 'anoDeCompra'];
  taxis: Taxi[] = [];
  taxiSelecionado?: Taxi;

firstFormGroup = new FormGroup({
  inicio: new FormControl(new Date(this.inicio), [Validators.required, this.inicioBeforeFim()]),
  fim: new FormControl(new Date(this.fim), [Validators.required, this.fimAfterInicio(), this.turnoMaximoOitoHoras()])
});
secondFormGroup = new FormGroup({
  secondCtrl: new FormControl('', [this.selecionouTaxi()])
});

constructor(
  private route: ActivatedRoute,
  private motoristaService: MotoristaService,
  private messageService: MessageService,
  private turnoService: TurnoService,
  public datePipe: DatePipe
) { }

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

selecionouTaxi(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (this.taxis.includes(this.taxiSelecionado!)){
      return null;
    } else {
      return { taxiNaoSelecionado: true}
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

selected(t: Taxi){
  this.taxiSelecionado = t;
  this.updateValidityTaxiEscolhido();
}

onFinish(stepper: MatStepper) {
  console.log(this.taxiSelecionado);
  stepper.next();
}

  /*
  getMarcas(): void {
    this.taxiService.getMarcasEModelos()
      .subscribe(marcas => {
        for (let key of Object.getOwnPropertyNames(marcas)) {
          this.optionsMarcas.push(key);
          for(let model of marcas[key]){
            this.optionsModelos.push(model);
          }
        }
      });
  }

  save(): void {
      this.taxiService.addTaxi({
        matricula: this.matricula!.toLocaleUpperCase(),
        anoDeCompra: this.anoDeCompra,
        marca: this.marcaControl.value,
        modelo: this.modelo,
        conforto: this.conforto?.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ''),
      } as Taxi).subscribe({
        next: (taxi) => {
          if (taxi.name !== "HttpErrorResponse"){
            console.log('Created Taxi:', taxi);
            this.goBack();
          } else {
            //There was a specific error
            const error = taxi.error;
            console.log('Error creating taxi', error);
            if (error.code === 11000) {
              this.showErrors(Object.keys(error.keyPattern));
            }
          }
        }
      });
    }
*/
}
