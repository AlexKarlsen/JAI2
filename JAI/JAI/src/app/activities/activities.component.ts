import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  panelOpenState = false;
  party: any;
  common: any;
  games: any;
  work: any;
  refTable: any;

  constructor(private _fl: FlamelinkService) {}
  content: any;
  ngOnInit() {
  this._fl.getApp().content.subscribe('activities', (error, data) => {
    if (error) {
      console.error(error);
    }

    this.content = data;
    console.log(this.content);
  // Party
  });
  this._fl.getApp().content.subscribe('party', (error, data) => {
    if (error) {
      console.error(error);
    }

    this.party = Object.keys(data).map(key => data[ key ]);
    console.log(this.party);
  // Common
  });
  this._fl.getApp().content.subscribe('common', (error, data) => {
    if (error) {
      console.error(error);
    }

    this.common = Object.keys(data).map(key => data[ key ]);
    console.log(this.party);
  // Games
  });
  this._fl.getApp().content.subscribe('games', (error, data) => {
    if (error) {
      console.error(error);
    }

    this.games = Object.keys(data).map(key => data[ key ]);
    console.log(this.party);
  // Work
  });
  this._fl.getApp().content.subscribe('work', (error, data) => {
    if (error) {
      console.error(error);
    }

    this.work = Object.keys(data).map(key => data[ key ]);
    console.log(this.party);
  });
  // Referee Table
  this._fl.getApp().content.subscribe('refTable', (error, data) => {
    if (error) {
      console.error(error);
    }

    this.refTable = Object.keys(data).map(key => data[ key ]);
    console.log(this.party);
  });
  }
}
