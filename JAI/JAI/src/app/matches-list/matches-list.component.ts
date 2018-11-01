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
    let date = new Date();
    this._fl.getApp().content.subscribe('matches', { orderByChild: 'id', /* startAt: date, */ limitToLast: 100},(error, data) => {
      if (error) {
        console.error(error);
      }

      this.matches = Object.keys(data).map(key => data[ key ]);

      this.matches.forEach(i => {
        if(new Date(i.date).valueOf() < date.valueOf()){
          console.log(this.matches);
          this.matches.pop(i);
        }
      });
      // Client-side sorting waiting for flamelink update
      this.matches.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      console.log(this.matches)
    });

    
  }

}
