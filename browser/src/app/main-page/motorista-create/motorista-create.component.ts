import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, AbstractControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { Motorista } from '../motorista';
import { MotoristaService } from '../motorista.service';
import { MoradaCreateComponent } from '../morada-create/morada-create.component';


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
  @ViewChild(MoradaCreateComponent) moradaComponent?: MoradaCreateComponent;

  motoristaForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
    nif: new FormControl('', [Validators.required, Validators.min(100000000), Validators.max(999999999)]),
    genero: new FormControl('', [Validators.required, Validators.pattern('^Masculino|Feminino$')]),
    dataDeNascimento: new FormControl('', [Validators.required, this.dataInRange()], ),
    cartaDeConducao: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)])
  })

  dataInRange(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const data = control.value;
      if (new Date("1900") < data && data < new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)) return null;
      else return { dataInRange: true }
    }
  }

  constructor(
    private route: ActivatedRoute,
    private motoristaService: MotoristaService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.motoristaForm.invalid || this.moradaComponent!.moradaForm.invalid) return;
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
        console.log('Created Motorista:', motorista);
        this.goBack();
      },
      error: (err) => {
        console.error('Error creating motorista:', err);
      }
    });
  }
}