import { Component } from '@angular/core';
import { MoradaService } from '../morada.service';
import { Morada } from '../morada';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
    private moradaService: MoradaService,
  ) { }

  ngOnInit() {
    this.codPostal.valueChanges
      .pipe(
        debounceTime(600), 
        distinctUntilChanged(),
        switchMap((codigoPostal) => this.searchForLocalidade(codigoPostal))
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
    return this.moradaService
              .getLocalidadeByCodigoPostal(codPostal);
  }

  allFilled():boolean{
    return this.codPostal.value !== '0000-000'&& this.codPostal.value !== undefined &&
            this.localidade !== 'Localidade' && this.localidade !== undefined &&
              this.rua !== '' && this.rua !== undefined &&
                this.numero !== '' && this.numero !== undefined;
  }

  save(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.moradaService.addMorada({
        rua: this.rua,
        codigo_postal: this.codPostal.value,
        localidade: this.localidade
      } as Morada).subscribe({
        next: (createdMorada) => {
          console.log('Created Morada:', createdMorada);
          resolve(createdMorada._id); // Return the _id of the created Morada
        },
        error: (err) => {
          console.error('Error creating Morada:', err);
          reject(err); // Handle errors
        }
      });
    });
  }

}
