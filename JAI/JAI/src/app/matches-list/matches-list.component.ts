import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements OnInit {

  constructor(private _fl: FlamelinkService) { }
  matches;
  displayedColumns: string[] = ['time', 'home', 'away', 'refTable'];
  ngOnInit() {
        // Get the next game
        this._fl.getApp().content.subscribe('games', { orderByChild: 'id', /* startAt: date, limitToLast: 1 */}, (error, data) => {
          if (error) {
            console.error(error);
          }
          const tmp = Object.keys(data).map(key => data[ key ]);
          this.matches = this.clientSideFilterSort(tmp);
          console.log(this.matches);
        });
  }

  clientSideFilterSort(tmp) {
    // Today object
    const date = new Date();
    // Client-side filtering waiting for flamelink update
    // Iterate to fid expired events
    tmp.forEach(i => {
      // If expired remove element
      if (new Date(i.date) < date) {
        // Splice removes at index, count
        tmp.splice(i, 1);
      }
    });
    // Client-side sorting waiting for flamelink update
    tmp.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      // a - b to sort ascending
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    console.log('client-side sort and filter');
    return tmp;
 }

}
