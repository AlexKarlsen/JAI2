import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-politics',
  templateUrl: './politics.component.html',
  styleUrls: ['./politics.component.css']
})
export class PoliticsComponent implements OnInit {
  privacyPolitics;
  membersPolitics;
  content;
  showPrivacy = false;
  showMembers = false;

  constructor(private _fl: FlamelinkService) { }

  ngOnInit() {
    this._fl.getApp().content.subscribe('politicsMain', (error, data) => {
      if (error) {
        console.error(error);
      }

      this.content = data;
      console.log(this.content);
    });
    this._fl.getApp().content.subscribe('memberPolitics', (error, data) => {
      if (error) {
        console.error(error);
      }

      this.membersPolitics = data;
      console.log(this.membersPolitics);
    });
    this._fl.getApp().content.subscribe('privacyPolitics', (error, data) => {
      if (error) {
        console.error(error);
      }

      this.privacyPolitics = data;
      console.log(this.privacyPolitics);
    });
  }

  toggle(show) {
    if (show === 'privacy') {
      this.showPrivacy = !this.showPrivacy;
    } else if (show === 'members') {
      this.showMembers = !this.showMembers;
    }
  }

}
