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
  teams;
  // isOdd = true;

  constructor(private _fl: FlamelinkService, private dialog: MatDialog) { }

  ngOnInit() {
    this._fl.getApp().content.subscribe('contact', (error, data) => {
      if (error) {
        console.error(error);
      }

      this.content = data;
      console.log(this.content);
    });

    // this._fl.getApp().content.subscribe('teams', (error, data) => {
    //   if (error) {
    //     console.error(error);
    //   }
    //   const tmp = Object.keys(data).map(key => data[ key ]);
    //   this.teams = tmp;
    //   this.teams.forEach((item, index) => {
    //     console.log(item);
    //     item.practices.forEach(j => {
    //       if (j.oddMonth !== this.isOdd) {
    //         // this.teams[index].practices.splice(j, 2);
    //         this.teams[index].practices = item.practices.filter(p => p.oddMonth === this.isOdd);
    //       }
    //     });
    //   });
    //   // this.times = data;
    //   console.log(this.teams);
    // });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.width = '400px';
    dialogConfig.height = '550px';

    this.dialog.open(FacebookPagePluginComponent, dialogConfig);
  }
}
