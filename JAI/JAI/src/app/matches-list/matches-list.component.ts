import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css']
})
export class MatchesListComponent implements OnInit {

  constructor(private _fl: FlamelinkService, private helper: HelperService) { }
  matches;
  displayedColumns: string[] = ['time', 'home', 'away', 'refTable'];
  ngOnInit() {
        // Get the next game
        this._fl.getApp().content.subscribe('games', { orderByChild: 'id', /* startAt: date, limitToLast: 1 */}, (error, data) => {
          if (error) {
            console.error(error);
          }
          const tmp = Object.keys(data).map(key => data[ key ]);

          this.matches = this.helper.clientSideRemoveExpired(tmp);

          this.matches = this.helper.clientSideSortAscending(this.matches);
          console.log(this.matches);
        });
  }
}
