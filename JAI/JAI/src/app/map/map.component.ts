import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements OnInit {
  map_loaded = false;

  MapCenter = {
    longitude: 10.203921,
    latitude: 56.202939
  };
  MapMarkers = [
    {
      id: 1,
      name: "Annexhallen",
      address: "Bethesdavej 29, 8200 Aarhus N",
      latitude: 56.1776591,
      longitude:  10.2095014,
      show: true
    },
    {
      id: 2,
      name: "Ellevangskolen",
      address: "Jellebakken 17, 8240 Risskov",
      latitude: 56.203428,
      longitude: 10.217741,
      show: false
    },
    {
      id 3,
      name: "Ellekærhallen",
      address: "Jernaldervej 5, 8210 Aarhus V",
      latitude: 56.169821,
      longitude: 10.148745,
      show: false
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  changeMarker(marker) {
    this.MapMarkers.forEach(i => i.show = false);
    marker.show = !marker.show;
  }

  onMapReady() {
    this.map_loaded = true;
  }
}
