import { Component } from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import { MapViewerComponent } from "../map-viewer/map-viewer.component";

@Component({
  selector: 'app-pedido-create-form',
  templateUrl: './pedido-create-form.component.html',
  styleUrls: ['./pedido-create-form.component.css'],
})
export class PedidoCreateFormComponent {
  coordenadasDe?: string;
  coordenadasPara?: string;

  constructor(public dialog: MatDialog) {}

  openMap(): void {
    const dialogRef = this.dialog.open(MapViewerComponent, {
      height:'80%',
      width: '80%',
      data: {de: this.coordenadasDe, para: this.coordenadasPara}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      alert("You need to implement the feature of autofil for all these components")
    });
  }

}
