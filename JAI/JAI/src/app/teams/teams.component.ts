import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, of } from 'rxjs';

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

    const date = new Date();
    if ((date.getMonth() + 1) % 2 === 1) {
      this.isOdd = true;
    } else {
      this.isOdd = false;
    }

    this._fl.getApp().content.subscribe('teams', (error, data) => {
      if (error) {
        console.error(error);
      }
      const tmp = Object.keys(data).map(key => data[ key ]);
      this.teams = tmp;
      this.teams.forEach((item, index) => {
        console.log(item);
        item.practices.forEach(j => {
          if (j.oddMonth !== this.isOdd) {
            //this.teams[index].practices.splice(j, 2);
            this.teams[index].practices = item.practices.filter(p => p.oddMonth === this.isOdd);
          }
        });
      });
      // this.times = data;
      console.log(this.teams);
    });
  }

}
