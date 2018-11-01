import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements OnInit {
  MapCenter = {
    longitude: 10.203921,
    latitude: 56.162939
  };
  MapMarkers = [
    {
      name: "Annexhallen",
      address: "Bethesdavej 29, 8200 Aarhus N",
      latitude: 56.1776591,
      longitude:  10.2095014,
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
