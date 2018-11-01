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
  ngOnInit() {
    this._fl.getApp().content.subscribe('matches', { orderByChild: 'id', limitToFirst: 100},(error, data) => {
      if (error) {
        console.error(error);
      }

      this.matches = Object.keys(data).map(key => data[ key ]);
      
      // Today object
      let date = new Date();
      // Client-side filtering waiting for flamelink update
      // Iterate to fid expired events
      this.matches.forEach(i => {
        // If expired remove element
        if(new Date(i.date) < date){
          // Splice removes at index, count
          this.matches.splice(i,1);
        }
      });
      // Client-side sorting waiting for flamelink update
      this.matches.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        // a - b to sort ascending
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      console.log(this.matches)
    });

    
  }

}
