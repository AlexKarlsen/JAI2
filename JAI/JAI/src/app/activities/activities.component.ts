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
    });

    // Get next party
    this._fl.getApp().content.subscribe('party', (error, data) => {
      if (error) {
        console.error(error);
      }

      let tmp = Object.keys(data).map(key => data[ key ]);
      console.log(tmp);
      tmp = this.helper.clientSideRemoveExpired(tmp);
      this.party = this.helper.clientSideSortAscending(tmp)[0];
    });

    // Get next common activity
    this._fl.getApp().content.subscribe('common', (error, data) => {
      if (error) {
        console.error(error);
      }

      let tmp = Object.keys(data).map(key => data[ key ]);
      console.log(tmp);
      tmp = this.helper.clientSideRemoveExpired(tmp);
      this.common = this.helper.clientSideSortAscending(tmp)[0];
    });

    // Get the next game
    this._fl.getApp().content.subscribe('games', { orderByChild: 'id', /* startAt: date, limitToLast: 1 */}, (error, data) => {
      if (error) {
        console.error(error);
      }

      let games = Object.keys(data).map(key => data[ key ]);
      games = this.helper.clientSideRemoveExpired(games);
      this.nextGame = this.helper.clientSideSortAscending(games)[0];
      console.log(this.nextGame);
    });

    // Get the next volunteer work event
    this._fl.getApp().content.subscribe('work', (error, data) => {
      if (error) {
        console.error(error);
      }

      let tmp = Object.keys(data).map(key => data[ key ]);
      console.log(tmp);
      tmp = this.helper.clientSideRemoveExpired(tmp);
      this.work = this.helper.clientSideSortAscending(tmp)[0];
    });

    // Referee Table
    // this._fl.getApp().content.subscribe('refTable', (error, data) => {
    //   if (error) {
    //     console.error(error);
    //   }

    //   const tmp = Object.keys(data).map(key => data[ key ]);
    //   this.refTable = this.helper.clientSideSortAscending(tmp)[0];
    // });
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
