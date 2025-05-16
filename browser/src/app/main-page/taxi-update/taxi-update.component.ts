import { Component, inject, ViewChild } from '@angular/core';
import { TaxiCreateComponent } from '../taxi-create/taxi-create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TaxiService } from '../taxi.service';
import { Location } from '@angular/common';
import { Taxi } from '../taxi';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-taxi-update',
  templateUrl: './taxi-update.component.html',
  styleUrls: ['./taxi-update.component.css']
})
export class TaxiUpdateComponent {
  taxi! : Taxi;

  @ViewChild(TaxiCreateComponent) taxiCreateComponent!: TaxiCreateComponent;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private route : ActivatedRoute,
    private location: Location,
    private taxiService : TaxiService,
  ){}

  ngOnInit(): void {
    this.getTaxi();
    document.getElementById("register-button")!.style.display = "none";
    document.getElementById("header")!.innerHTML = "Atualizar Taxi"
  }

  getTaxi() : void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taxiService.getTaxi(id!)
      .subscribe(taxi => this.populateTaxi(taxi));
  }

  populateTaxi(taxi: Taxi): void{
    this.taxi = taxi;
    this.taxiCreateComponent.setTaxi(taxi);
  }

  async updateTaxi() : Promise<void> {
    let taxi : Taxi = this.taxiCreateComponent.getTaxi()
    taxi._id = this.taxi._id;
    await firstValueFrom(this.taxiService.updateTaxi(taxi));
    this._snackBar.open('Taxi atualizado com sucesso', 'Okay', {duration: 5000});
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
