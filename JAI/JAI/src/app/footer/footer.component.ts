import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _fl: FlamelinkService) { }
  content;
  ngOnInit() {
    this._fl.getApp().content.subscribe('footer', {populate: ['sponsorImage']} , (error, data) => {
      if (error) {
        console.error(error);
      }

      this.content = data;
      console.log(this.content);
    });
  }

}
