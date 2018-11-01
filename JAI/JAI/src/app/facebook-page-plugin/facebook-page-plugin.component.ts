import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-facebook-page-plugin',
  templateUrl: './facebook-page-plugin.component.html',
  styleUrls: ['./facebook-page-plugin.component.css']
})
export class FacebookPagePluginComponent implements OnInit {

  constructor(private _fb: FacebookService) { }

  ngOnInit() {
    let initParams: InitParams = {
      appId: '147541496070957',
      xfbml: true,
      version: 'v2.8'
    };
 
    this._fb.init(initParams);
  }

}
