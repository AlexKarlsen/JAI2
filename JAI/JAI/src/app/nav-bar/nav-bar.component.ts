import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  items: [];
  constructor(private _fs: FlamelinkService) { }
  mode = 'over';
  ngOnInit() {
    this._fs.getApp().nav.subscribe('topbar', (error, data) => {
      if (error) {
        console.error(error);
      }
      this.items = data.items;
    });

    // this._fs.getApp().storage.ref('1540891367900_JAI_logo_vektor_sk_rm.svg')
    //   .getDownloadURL().then(url => this.icon = url)
    //   .catch(error => console.error('Something went wrong while retrieving the file URL. Details:', error));
  }

}
