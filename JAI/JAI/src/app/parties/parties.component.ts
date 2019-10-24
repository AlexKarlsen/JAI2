import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { HelperService } from '../helper.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DataService } from '../data.service';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {

  parties;

  constructor(private _fl: FlamelinkService, private helper: HelperService, private dialog: MatDialog, private _ds: DataService) { }

  ngOnInit() {
        // Get parties
        this._fl.getApp().content.subscribe('party', (error, data) => {
          if (error) {
            console.error(error);
          }
          const tmp = Object.keys(data).map(key => data[ key ]);
          console.log(tmp);
          this.parties = this.helper.clientSideRemoveExpired(tmp);

          this.parties = this.helper.clientSideSortAscending(this.parties);
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
