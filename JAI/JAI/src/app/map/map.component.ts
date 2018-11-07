import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { MapCenter } from './MapCenter';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements OnInit {
  map_loaded = false;

 

  constructor(private _fl: FlamelinkService) { }
  Arenas;

  mapCenter = new MapCenter();
  ngOnInit() {
    this._fl.getApp().content.subscribe('arenas', (error, data) => {
      if (error) {
        console.error(error);
      }

      let tmp = Object.keys(data).map(key => data[ key ]);

      // Calculating the mean of the location coordinates
      tmp.forEach(i => {
        this.mapCenter.latitude += i.location.lat
        this.mapCenter.longitude += i.location.lng
      })
      this.mapCenter.longitude = this.mapCenter.longitude / tmp.length;
      this.mapCenter.latitude = this.mapCenter.latitude / tmp.length;

      this.Arenas = tmp;
    });
  }

  changeMarker(marker) {
    this.Arenas.forEach(i => i.showOnMaps = false);
    marker.showOnMaps = !marker.showOnMaps;
  }

  onMapReady() {
    this.map_loaded = true;
  }
}
