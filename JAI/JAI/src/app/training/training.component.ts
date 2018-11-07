import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  times;
  constructor(private _fl: FlamelinkService) { }
  isOdd;
  ngOnInit() {
    this._fl.getApp().content.subscribe('teams',(error, data) => {
      if (error) {
        console.error(error);
      }
      this.times = Object.keys(data).map(key => data[ key ]);
      //this.times = data;
      console.log(this.times);
    });

    var date = new Date();
    if ((date.getMonth()+1)%2 == 1) {
      this.isOdd = true;
    } else {
      this.isOdd = false;
    }

  }

  displayedColumns: string[] = ['hold', 'dag', 'tid', 'sted'];
}
