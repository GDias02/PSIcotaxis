import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { MotoristaService } from '../motorista.service';

@Component({
  selector: 'app-morada-create',
  templateUrl: './morada-create.component.html',
  styleUrls: ['./morada-create.component.css']
})
export class MoradaCreateComponent {
  codPostal: FormControl = new FormControl('0000-000'); //FormControl to detect input, to then detect localidade
  localidade: string = 'Localidade';
  rua: string = '';
  numero: string = '';
  
  constructor(
    private motoristaService: MotoristaService
  ) { }

  ngOnInit() {
    this.codPostal.valueChanges
      .pipe(
        debounceTime(500), 
        distinctUntilChanged(),
        filter((codigoPostal) => /^\d{4}-\d{3}$/.test(codigoPostal)), // Ensure it matches the regex iiii-iii
        switchMap((codigoPostal) => this.searchForLocalidade(codigoPostal)),
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

  allFilled():boolean{
    return this.codPostal.value !== '0000-000'&& this.codPostal.value !== undefined &&
            this.localidade !== 'Localidade' && this.localidade !== undefined &&
              this.rua !== '' && this.rua !== undefined &&
                this.numero !== '' && this.numero !== undefined;
  }

}
