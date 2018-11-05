import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  constructor(private _fl: FlamelinkService) {}
  content: any;
  ngOnInit(){
  this._fl.getApp().content.subscribe('activities', (error, data) => {
    if (error) {
      console.error(error);
    }

    this.content = data;
    console.log(this.content);
  });
  }
}
