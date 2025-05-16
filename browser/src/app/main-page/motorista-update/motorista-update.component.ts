import { Component, inject, ViewChild } from '@angular/core';
import { MotoristaCreateComponent } from '../motorista-create/motorista-create.component';
import { MotoristaService } from '../motorista.service';
import { Motorista } from '../motorista';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-motorista-update',
  templateUrl: './motorista-update.component.html',
  styleUrls: ['./motorista-update.component.css']
})
export class MotoristaUpdateComponent {
  motorista!: Motorista;

  @ViewChild(MotoristaCreateComponent) motoristaCreateComponent!: MotoristaCreateComponent;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private motoristaService : MotoristaService,
  ){}

  ngOnInit(): void {
    this.getMotorista();
    document.getElementById("register-button")!.style.display = "none";
    document.getElementById("header")!.innerHTML = "Atualizar Motorista";
  }

  getMotorista(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.motoristaService.getMotorista(id!)
      .subscribe(motorista => this.populateMotorista(motorista));
  }

  populateMotorista(motorista: Motorista): void {
    this.motorista = motorista;
    this.motoristaCreateComponent.setMotorista(motorista);
  }

  async updateMotorista(): Promise<void> {
    //Send motorista with the respective id
    let motorista : Motorista = this.motoristaCreateComponent.getMotorista();
    motorista._id = this.motorista._id;
    await firstValueFrom(this.motoristaService.updateMotorista(motorista));
    this._snackBar.open('Motorista atualizado com sucesso!', 'Okay', {duration: 5000});
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
