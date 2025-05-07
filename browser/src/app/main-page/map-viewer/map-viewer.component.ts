import {Component, Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import * as L from 'leaflet';

export interface CoordenadasOnTheMap {
  coordenadasDe: string;
  coordenadasPara: string;
}

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css'],

})
export class MapViewerComponent {
  private map!: L.Map;
  coordenadasDe!: string;
  coordenadasPara!: string;
  isMobile = false;

  constructor(
    public dialogRef: MatDialogRef<MapViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CoordenadasOnTheMap,
    private breakpointObserver: BreakpointObserver
  ) {}
  

  ngOnInit(){
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }


  ngAfterViewInit(): void{
    //Set view on map to FCUL
    this.map = L.map('map').setView([38.756581, -9.155152], 20);

    //Add a tile layer to put every map image correctly
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    //If allowed, let the geolocation be user's current position
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0, //age of oldest in-cache geolocation data
    };
    navigator.geolocation.getCurrentPosition((position) => {
      //Success case:
      this.map.setView([position.coords.latitude, position.coords.longitude],20);
      this.coordenadasDe = `${position.coords.latitude}, ${position.coords.longitude}`;
    },
    (error) => {
      console.warn('Geolocation failed or not allowed', error);
    },options
  )


    //Make so that when there is a click on the map, a pop up shows
    this.map.on('click', (e) => {
      this.clikingOnTheMap(e);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  public sendBack() : void {
    this.dialogRef.close([this.coordenadasDe, this.coordenadasPara]);
  }

  /**
   * Takes care of clicking on the map
   * @param e mouse event
   */
  private clikingOnTheMap(e: L.LeafletMouseEvent): void {
    this.showPopup(e);
    this.fillInputsWithData(e.latlng.toString());
  }

  /**
   * Shows on the map the coordinates where the user clicked
   * @param e mouse event to show
   */
  private showPopup(e: L.LeafletMouseEvent) : void {
    L.popup()
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map);
  }

  private fillInputsWithData(content : string) : void {
    //LatLng(38.756777, -9.155773)
    //to -> 38.756777, -9.155773
    content = content.substring(7,26);
    if (this.coordenadasDe === undefined || this.coordenadasDe.length === 0){
      this.coordenadasDe = content;
    } else {
      this.coordenadasPara = content;
    }
  }

}
