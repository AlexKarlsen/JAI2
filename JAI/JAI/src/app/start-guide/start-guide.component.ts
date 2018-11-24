import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-start-guide',
  templateUrl: './start-guide.component.html',
  styleUrls: ['./start-guide.component.css']
})
export class StartGuideComponent implements OnInit {
  content;

  constructor(private _fl: FlamelinkService) { }

  ngOnInit() {
    this._fl.getApp().content.subscribe('startGuide', (error, data) => {
      if (error) {
        console.error(error);
      }

      this.content = data;
      console.log(this.content);
    });
  }

}
