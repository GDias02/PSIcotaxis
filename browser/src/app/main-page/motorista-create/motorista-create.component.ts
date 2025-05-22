import { Component, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, AbstractControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';
import { MoradaCreateComponent } from '../morada-create/morada-create.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-motorista-create',
  templateUrl: './motorista-create.component.html',
  styleUrls: ['./motorista-create.component.css']
})
export class MotoristaCreateComponent {
  nif?: number;
  nome?: string;
  genero?: string;
  dataDeNascimento?: Date;
  cartaDeConducao?: string;
  @ViewChild(MoradaCreateComponent) moradaComponent!: MoradaCreateComponent;

  duplicateNif: boolean = false;
  duplicateCarta: boolean = false;

  motoristaForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), Validators.pattern('^[^\\d]*$')]),
    nif: new FormControl('', [Validators.required, Validators.min(100000000), Validators.max(999999999), this.duplicateNifValidator()]),
    genero: new FormControl('', [Validators.required, Validators.pattern('^Masculino|Feminino$')]),
    dataDeNascimento: new FormControl<Date>(new Date(), [Validators.required, this.dataInRange()], ),
    cartaDeConducao: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32), this.duplicateCartaValidator()])
  })

  @Input() enableSubmit = true;

  constructor(
    private route: ActivatedRoute,
    private motoristaService: MotoristaService,
    private location: Location,
    private messageService: MessageService
  ) {}

  dataInRange(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const data = control.value;
      if (new Date("1900") < data && data < new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)) return null;
      else return { dataInRange: true }
    }
  }

  duplicateNifValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nif = control.value;
      if (!this.duplicateNif) return null;
      else return { duplicateNif: true }
    }
  }

  duplicateCartaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const carta = control.value;
      if (!this.duplicateCarta) return null;
      else return { duplicateCarta: true }
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.motoristaForm.invalid || this.moradaComponent!.moradaForm.invalid || !this.enableSubmit) return;
    this.save();
  }

  moradaFormValid(): boolean {
    return this.moradaComponent!.moradaForm.valid
  }

  save(): void {
    this.motoristaService.addMotorista({
      nif: this.nif,
      nome: this.nome,
      genero: this.genero?.toLowerCase(),
      anoDeNascimento: this.dataDeNascimento,
      cartaDeConducao: this.cartaDeConducao,
      morada: {
        rua: this.moradaComponent?.rua,
        codigoPostal: this.moradaComponent?.codPostal,
        localidade: this.moradaComponent?.localidade,
        numeroDePorta: this.moradaComponent?.numero ?? ''
      }
    } as Motorista).subscribe({
      next: (motorista) => {
        if (motorista.name !== "HttpErrorResponse"){
          console.log('Created Motorista:', motorista);
          this.goBack();
        } else {
          //There was a specific error
          const error = motorista.error;
          if (error.code === 11000) {
            this.showErrors(Object.keys(error.keyPattern));
          }
        }
      }
    });
  }

  showErrors(controlNames: string[]) {
    for (let cname of controlNames) {
      switch (cname) {
        case "nif": this.duplicateNif = true; this.motoristaForm.controls["nif"].updateValueAndValidity(); break;
        case "cartaDeConducao": this.duplicateCarta = true; this.motoristaForm.controls["cartaDeConducao"].updateValueAndValidity(); break;
      }
      this.messageService.add(`${cname} já existe na base de dados`);
    }
  }

  setMotorista(motorista : Motorista) : void {
    this.nif = motorista.nif;
    this.nome = motorista.nome;
    this.genero = motorista.genero == 'feminino' ? 'Feminino' : 'Masculino';
    this.dataDeNascimento = motorista.anoDeNascimento;
    this.cartaDeConducao = motorista.cartaDeConducao;
    this.motoristaForm.controls["nif"].setValue(String(motorista.nif));
    this.motoristaForm.controls["nome"].setValue(motorista.nome);
    this.motoristaForm.controls["genero"].setValue(motorista.genero == 'feminino' ? 'Feminino' : 'Masculino');
    this.motoristaForm.controls["dataDeNascimento"].setValue(
      motorista.anoDeNascimento ? new Date(motorista.anoDeNascimento) : new Date());
    this.motoristaForm.controls["cartaDeConducao"].setValue(motorista.cartaDeConducao);
    this.moradaComponent.setMorada(motorista.morada);
  }

  getMotorista(): Motorista {
    return {
      nif: this.nif,
      nome: this.nome,
      genero: this.genero?.toLocaleLowerCase(),
      anoDeNascimento: this.dataDeNascimento,
      cartaDeConducao: this.cartaDeConducao,
      morada: {
        rua: this.moradaComponent?.rua,
        codigoPostal: this.moradaComponent?.codPostal,
        localidade: this.moradaComponent?.localidade,
        numeroDePorta: this.moradaComponent?.numero
      }
    } as Motorista;
  }

  formIsValid(): boolean {
    return this.motoristaForm.valid && this.moradaComponent.formIsValid();
  }
}