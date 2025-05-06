import {Component} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css'],

})
export class MapViewerComponent {
  private map!: L.Map;

  ngAfterViewInit(): void{
    this.map = L.map('map').setView([38.756581, -9.155152], 20);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e) => {
      L.popup()
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map);
    })
  }
}
