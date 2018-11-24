import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  work;
  constructor(private _fl: FlamelinkService, private helper: HelperService) { }

  ngOnInit() {
    // Get the next volunteer work event
    this._fl.getApp().content.subscribe('work', (error, data) => {
      if (error) {
        console.error(error);
      }

      const tmp = Object.keys(data).map(key => data[ key ]);
      this.work = this.helper.clientSideFilterSort(tmp);
    });
  }

}
