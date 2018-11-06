import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  panelOpenState = false;
  party: any;
  common: any;
  nextGame: any;
  work: any;
  refTable: any;
  content: any;

  constructor(private _fl: FlamelinkService) {}
  
  ngOnInit() {
    this.SubscribeToActivities()
  
  }

  SubscribeToActivities() {
    this._fl.getApp().content.subscribe('activities', (error, data) => {
      if (error) {
        console.error(error);
      }
  
      this.content = data;
      console.log(this.content);
    });

    // Get next party
    this._fl.getApp().content.subscribe('party', { limitToLast: 1},(error, data) => {
      if (error) {
        console.error(error);
      }
  
      this.party = Object.keys(data).map(key => data[ key ]);
      console.log(this.party);
    });

    // Get next common activity
    this._fl.getApp().content.subscribe('common', (error, data) => {
      if (error) {
        console.error(error);
      }
  
      this.common = Object.keys(data).map(key => data[ key ]);
      console.log(this.common);
    });

    // Get the next game
    this._fl.getApp().content.subscribe('matches', { orderByChild: 'id', /* startAt: date, limitToLast: 1 */},(error, data) => {
      if (error) {
        console.error(error);
      }

      let matches = Object.keys(data).map(key => data[ key ]);

      // Today object
      let date = new Date();
      // Client-side filtering waiting for flamelink update
      // Iterate to fid expired events
      matches.forEach(i => {
        // If expired remove element
        if(new Date(i.date) < date){
          // Splice removes at index, count
          matches.splice(i,1);
        }
      });
      // Client-side sorting waiting for flamelink update
      matches.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        // a - b to sort ascending
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      this.nextGame = matches[0];
    });

    // Get the next volunteer work event
    this._fl.getApp().content.subscribe('work', (error, data) => {
      if (error) {
        console.error(error);
      }
  
      this.work = Object.keys(data).map(key => data[ key ]);
      console.log(this.work);
    });

    // Referee Table
    this._fl.getApp().content.subscribe('refTable', (error, data) => {
      if (error) {
        console.error(error);
      }
  
      this.refTable = Object.keys(data).map(key => data[ key ]);
      console.log(this.refTable);
    });
  }
}
