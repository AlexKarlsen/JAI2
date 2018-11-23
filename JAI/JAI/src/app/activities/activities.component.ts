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

  displayedColumns: string[] = ['time', 'home', 'away', 'refTable'];

  constructor(private _fl: FlamelinkService) {}


  ngOnInit() {
    this.SubscribeToActivities();
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
    this._fl.getApp().content.subscribe('party', (error, data) => {
      if (error) {
        console.error(error);
      }

      const tmp = Object.keys(data).map(key => data[ key ]);
      console.log(tmp);
      this.party = this.clientSideFilterSort(tmp)[0];
    });

    // Get next common activity
    this._fl.getApp().content.subscribe('common', (error, data) => {
      if (error) {
        console.error(error);
      }

      const tmp = Object.keys(data).map(key => data[ key ]);
      this.common = this.clientSideFilterSort(tmp)[0];
    });

    // Get the next game
    this._fl.getApp().content.subscribe('games', { orderByChild: 'id', /* startAt: date, limitToLast: 1 */}, (error, data) => {
      if (error) {
        console.error(error);
      }

      const games = Object.keys(data).map(key => data[ key ]);

      this.nextGame = this.clientSideFilterSort(games)[0];
      console.log(this.nextGame);
    });

    // Get the next volunteer work event
    this._fl.getApp().content.subscribe('work', (error, data) => {
      if (error) {
        console.error(error);
      }

      const tmp = Object.keys(data).map(key => data[ key ]);
      this.work = this.clientSideFilterSort(tmp)[0];
    });

    // Referee Table
    this._fl.getApp().content.subscribe('refTable', (error, data) => {
      if (error) {
        console.error(error);
      }

      const tmp = Object.keys(data).map(key => data[ key ]);
      this.refTable = this.clientSideFilterSort(tmp)[0];
    });
  }

  clientSideFilterSort(tmp) {
     // Today object
     const date = new Date();
     // Client-side filtering waiting for flamelink update
     // Iterate to fid expired events
     tmp.forEach(i => {
       // If expired remove element
       if (new Date(i.date) < date) {
         // Splice removes at index, count
         tmp.splice(i, 1);
       }
     });
     // Client-side sorting waiting for flamelink update
     tmp.sort(function(a, b) {
       // Turn your strings into dates, and then subtract them
       // to get a value that is either negative, positive, or zero.
       // a - b to sort ascending
       return new Date(a.date).getTime() - new Date(b.date).getTime();
     });
     console.log('client-side sort and filter');
     return tmp;
  }
}
