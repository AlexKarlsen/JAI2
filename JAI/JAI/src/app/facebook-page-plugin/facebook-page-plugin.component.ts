import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-facebook-page-plugin',
  templateUrl: './facebook-page-plugin.component.html',
  styleUrls: ['./facebook-page-plugin.component.css']
})
export class FacebookPagePluginComponent implements OnInit {

  constructor(private _fb: FacebookService, private dialogRef: MatDialogRef<FacebookPagePluginComponent>) { }

  ngOnInit() {
    const initParams: InitParams = {
      appId: '147541496070957',
      xfbml: true,
      version: 'v2.8'
    };

    this._fb.init(initParams);
  }

  close() {
    this.dialogRef.close();
  }

}
