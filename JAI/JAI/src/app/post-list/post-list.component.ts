import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlamelinkService } from '../flamelink.service';
import { DataService } from '../data.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PostDetailComponent } from '../post-detail/post-detail.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  mobHeight: any;
  mobWidth: any;
  slidesToShow = 1;
  posts: any[];
  slideConfig;

  constructor(private _fl: FlamelinkService, private _ds: DataService, private _router: Router, private dialog: MatDialog) {
    this.mobHeight = (window.screen.height) + 'px';
    this.mobWidth = (window.screen.width) + 'px';
    console.log(this.mobHeight);
    console.log(this.mobWidth);
    // if (window.screen.width > 600) {
    //   console.log('setting number of slides to show');
    //   this.slidesToShow = 2;
    // } else if (window.screen.width > 900) {
    //   this.slidesToShow = 3;
    // }
    console.log(this.slidesToShow);
    this.slideConfig = {
      'slidesToShow': this.slidesToShow,
      'slidesToScroll': 1,
      'dots': true,
      'infinite': true,
      'autoplay': true,
      'autoplaySpeed': 3000
    };
  }

  ngOnInit() {
    // This should be updated to only retrieve some of the newest posts
    this._fl.getApp().content.subscribe('posts', { orderByValue: 'date', limitToLast: 3, populate: ['mainImage'] }, (error, data) => {
      if (error) {
        console.error(error);
      }

      this.posts = Object.keys(data).map(key => data[key]);

      // Client-side sorting waiting for flamelink update
      this.posts.sort(function (a, b) {
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

  openDialog(post) {

    const dialogConfig = new MatDialogConfig();
    this._ds.setData(post);
    dialogConfig.autoFocus = true;

    dialogConfig.maxWidth = '90vw';
    dialogConfig.width = '98%';
    dialogConfig.height = '95%';

    this.dialog.open(PostDetailComponent, dialogConfig);
  }
}
