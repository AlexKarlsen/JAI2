import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { HelperService } from '../helper.service';


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

  constructor(private _fl: FlamelinkService, private helper: HelperService) {}


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
      this.party = this.helper.clientSideFilterSort(tmp)[0];
    });

    // Get next common activity
    this._fl.getApp().content.subscribe('common', (error, data) => {
      if (error) {
        console.error(error);
      }

      const tmp = Object.keys(data).map(key => data[ key ]);
      this.common = this.helper.clientSideFilterSort(tmp)[0];
    });

    // Get the next game
    this._fl.getApp().content.subscribe('games', { orderByChild: 'id', /* startAt: date, limitToLast: 1 */}, (error, data) => {
      if (error) {
        console.error(error);
      }

      const games = Object.keys(data).map(key => data[ key ]);
      this.nextGame = this.helper.clientSideFilterSort(games)[0];

      // expired checking
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      console.log(today);
      if (new Date(this.nextGame.date) <= today) {
        this.nextGame = null;
      }
      console.log(this.nextGame);
    });

    // Get the next volunteer work event
    this._fl.getApp().content.subscribe('work', (error, data) => {
      if (error) {
        console.error(error);
      }

      const tmp = Object.keys(data).map(key => data[ key ]);
      this.work = this.helper.clientSideFilterSort(tmp)[0];
    });

    // Referee Table
    this._fl.getApp().content.subscribe('refTable', (error, data) => {
      if (error) {
        console.error(error);
      }

      const tmp = Object.keys(data).map(key => data[ key ]);
      this.refTable = this.helper.clientSideFilterSort(tmp)[0];
    });
  }
}
