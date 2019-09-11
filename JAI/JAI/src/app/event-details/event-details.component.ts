import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FlamelinkService } from '../flamelink.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  post: any;

  constructor(
    private route: ActivatedRoute,
    private _ds: DataService,
    private _fs: FlamelinkService,
    private dialogRef: MatDialogRef<EventDetailsComponent> ) { }

  ngOnInit() {
    // If the app is loaded here, the serviceData will be null, hence the post must be fetched.
    if (this._ds.getData() == null) {
      // Get the id from Url path
      this.route.params.subscribe(params => {
        const id = params['id'];
        this._fs.getApp().content.subscribe('party', id, (error, data) => {
          if (error) {
            console.error(error);
          }
          console.log(data);
          // this.post = Object.keys(data).map(key => data[key]);
          // console.log(this.post)
          this.post = data;
        });
      });
    } else {
      // Get passed on data from DataService
      this.post = this._ds.getData();
    }
  }

  close() {
    this.dialogRef.close();
  }

}
