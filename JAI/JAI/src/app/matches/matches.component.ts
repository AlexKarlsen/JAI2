import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  matches;
  constructor(private _fl: FlamelinkService) { }

  ngOnInit() {
    let date = new Date().getMilliseconds();
    this._fl.getApp().content.subscribe('matches', { orderByChild: 'id', startAt: date, limitToLast: 1},(error, data) => {
      if (error) {
        console.error(error);
      }

      this.matches = Object.keys(data).map(key => data[ key ]);

      console.log(this.matches)
    });
  }

}
