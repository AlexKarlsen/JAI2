import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {

  parties;

  constructor(private _fl: FlamelinkService, private helper: HelperService) { }

  ngOnInit() {
        // Get parties
        this._fl.getApp().content.subscribe('party', (error, data) => {
          if (error) {
            console.error(error);
          }
          const tmp = Object.keys(data).map(key => data[ key ]);
          console.log(tmp);
          this.parties = this.helper.clientSideFilterSort(tmp);
        });
  }

}
