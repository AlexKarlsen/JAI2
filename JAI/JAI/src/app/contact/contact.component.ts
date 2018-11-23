import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { FacebookPagePluginComponent } from '../facebook-page-plugin/facebook-page-plugin.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  content;

  constructor(private _fl: FlamelinkService, private dialog: MatDialog) { }

  ngOnInit() {
    this._fl.getApp().content.subscribe('contact', (error, data) => {
      if (error) {
        console.error(error);
      }

      this.content = data;
      console.log(this.content);
    });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.width = '400px';
    dialogConfig.height = '550px';

    this.dialog.open(FacebookPagePluginComponent, dialogConfig);
  }
}
