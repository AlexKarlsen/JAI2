import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FlamelinkService } from '../flamelink.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: any[];
  slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'dots': true,
    'infinite': true,
    'autoplay': true,
    'autoplaySpeed': 3000
  };
  constructor(private _fl: FlamelinkService, private _ds: DataService, private _router: Router) { }

  ngOnInit() {
    // This should be updated to only retrieve some of the newest posts
    this._fl.getApp().content.subscribe('posts', { orderByValue: 'date', limitToLast: 3, populate: ['mainImage'] }, (error, data) => {
      if (error) {
        console.error(error);
      }

      this.posts = Object.keys(data).map(key => data[ key ]);

      // Client-side sorting waiting for flamelink update
      this.posts.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      console.log(this.posts);
    });

  }

  // Post click event to see Post-detail component
  onSelect(post): void {
    // Save the data to pass onto the post-detail component
    this._ds.setData(post);
    // navigate to component
    this._router.navigate(['/detail/' + post.id]);
  }

   slickInit(e) {
    console.log('slick initialized');
  }

}
