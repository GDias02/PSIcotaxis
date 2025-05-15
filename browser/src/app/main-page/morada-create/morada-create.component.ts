import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, AbstractControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

import { MotoristaService } from '../motorista.service';
import { Morada } from '../morada';

@Component({
  selector: 'app-morada-create',
  templateUrl: './morada-create.component.html',
  styleUrls: ['./morada-create.component.css']
})
export class MoradaCreateComponent {
  codPostal: string = '';
  localidade: string = '';
  rua: string = '';
  numero: string = '';

  moradaForm = new FormGroup({
    codPostal: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}-\\d{3}$')]),
    localidade: new FormControl('', [Validators.required]),
    rua: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })
  
  constructor(
    private motoristaService: MotoristaService
  ) { }

  ngOnInit() {
    this.moradaForm.controls['codPostal'].valueChanges
      .pipe(
        debounceTime(500), 
        distinctUntilChanged(),
        filter((codigoPostal) => /^\d{4}-\d{3}$/.test(codigoPostal!)), // Ensure it matches the regex iiii-iii
        switchMap((codigoPostal) => this.searchForLocalidade(codigoPostal!)),
      )
      .subscribe({
        next: (localidade) => {
          this.localidade = localidade;
        },
        error: (err) => {
          console.error('Error fetching localidade:', err);
        }
      });
  }

  searchForLocalidade(codPostal: string):Observable<string>{
    return this.motoristaService.getLocalidadeByCodigoPostal(codPostal);
  }

  registerMorada(morada: Morada):void{
    this.codPostal = morada.codigoPostal;
    this.localidade = morada.localidade;
    this.rua = morada.rua;
    this.numero = morada.numeroDePorta;
  }

  getRespectiveMorada():Morada{
    const data = this.moradaForm.value;
    return {
      codigoPostal: data.codPostal ?? "0000-000",
      localidade: data.localidade ?? "não encontrada",
      rua: data.rua ?? "não encontrada",
      numeroDePorta: this.numero
    };
  }

  setMorada(morada: Morada): void {
    this.codPostal = morada.codigoPostal;
    this.localidade = morada.localidade;
    this.rua = morada.rua;
    this.numero = morada.numeroDePorta;
  }
}
