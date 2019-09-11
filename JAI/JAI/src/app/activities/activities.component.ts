import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { HelperService } from '../helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DataService } from '../data.service';
import { EventDetailsComponent } from '../event-details/event-details.component';


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

  constructor(private _fl: FlamelinkService, private helper: HelperService, private dialog: MatDialog, private _ds: DataService) {}


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
      this.nextGame = this.helper.clientSideSortDescending(games)[0];
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

  openDialog(post) {

    const dialogConfig = new MatDialogConfig();
    this._ds.setData(post);
    dialogConfig.autoFocus = true;

    dialogConfig.maxWidth = '90vw';
    dialogConfig.width = '98%';
    dialogConfig.height = '95%';

    this.dialog.open(EventDetailsComponent, dialogConfig);
  }
}
