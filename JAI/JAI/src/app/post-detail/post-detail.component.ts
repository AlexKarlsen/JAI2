import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FlamelinkService } from '../flamelink.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: any;

  constructor(private route: ActivatedRoute, private _ds: DataService, private _fs: FlamelinkService) { }

  ngOnInit() {
    // If the app is loaded here, the serviceData will be null, hence the post must be fetched.
    if (this._ds.getData() == null) {
      // Get the id from Url path
      this.route.params.subscribe(params => {
        const id = params['id'];
        this._fs.getApp().content.subscribe('posts', id, (error, data) => {
          if (error) {
            console.error(error);
          }
          console.log(data);
          // this.post = Object.keys(data).map(key => data[key]);
          // console.log(this.post)
          this.post = data;
        });
      });
    } else {
      // Get passed on data from DataService
      this.post = this._ds.getData();
    }
  }

}
