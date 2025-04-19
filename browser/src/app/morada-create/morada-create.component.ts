import { Component } from '@angular/core';
import { MoradaService } from '../morada.service';
import { Morada } from '../morada';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-morada-create',
  templateUrl: './morada-create.component.html',
  styleUrls: ['./morada-create.component.css']
})
export class MoradaCreateComponent {
  codPostal: string = '0000-000'; 
  localidade: string = 'Localidade';
  rua: string = '';
  numero: string = '';
  
  constructor(
    private moradaService: MoradaService,
  ) { }

  //TODO 
  //ngOnInit()//Every 1 sec after Codigo Postal is changed search for localidade
  //Morada needs endpoints in the server
  //The server needs logic to determine what localidade corresponds to what código postal
  //Fix motorista-create component, it needs to be a proper form
  //Motorista-create component calls morada-create's save(),
  //and uses its _id to make a new Motorista

  searchForLocalidade():Observable<String>{
    return this.moradaService
              .getLocalidadeByCodigoPostal(this.codPostal);
  }

  save(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.moradaService.addMorada({
        rua: this.rua,
        codigo_postal: this.codPostal,
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
