import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  nextMatch;
  constructor(private _fl: FlamelinkService) { }

  ngOnInit() {
    this._fl.getApp().content.subscribe('matches', { orderByChild: 'id', /* startAt: date, limitToLast: 1 */}, (error, data) => {
      if (error) {
        console.error(error);
      }

      const matches = Object.keys(data).map(key => data[ key ]);

      // Today object
      const date = new Date();
      // Client-side filtering waiting for flamelink update
      // Iterate to fid expired events
      matches.forEach(i => {
        // If expired remove element
        if (new Date(i.date) < date) {
          // Splice removes at index, count
          matches.splice(i, 1);
        }
      });
      // Client-side sorting waiting for flamelink update
      matches.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        // a - b to sort ascending
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      this.nextMatch = matches[0];
    });
  }

}
