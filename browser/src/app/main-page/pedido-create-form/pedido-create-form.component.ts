import { Component } from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import { MapViewerComponent } from "../map-viewer/map-viewer.component";

@Component({
  selector: 'app-pedido-create-form',
  templateUrl: './pedido-create-form.component.html',
  styleUrls: ['./pedido-create-form.component.css'],
})
export class PedidoCreateFormComponent {
  animal?: string;
  name?: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(MapViewerComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
