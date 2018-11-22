import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})

export class TeamsComponent implements OnInit {

  teams;
  displayedColumns: string[] = ['day', 'time', 'place'];
  isOdd;
  times;

  constructor(private _fl: FlamelinkService) { }

  ngOnInit() {
    this._fl.getApp().content.subscribe('teams',(error, data) => {
      if (error) {
        console.error(error);
      }
      let tmp = Object.keys(data).map(key => data[ key ]);
      this.teams = tmp;
      //this.times = data;
      console.log(this.teams);
    });

    var date = new Date();
    if ((date.getMonth()+1)%2 == 1) {
      this.isOdd = true;
    } else {
      this.isOdd = false;
    }
  }

}
