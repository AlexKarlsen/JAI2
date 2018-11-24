import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FlamelinkService } from '../flamelink.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-post-archive',
  templateUrl: './post-archive.component.html',
  styleUrls: ['./post-archive.component.css']
})
export class PostArchiveComponent implements OnInit {

  LOAD_COUNT_NUMBER = 10;
  posts: Array<any>;
  loadCount: number = this.LOAD_COUNT_NUMBER;
  noMore: Boolean = false;

  constructor(
    private _fl: FlamelinkService,
    private _ds: DataService,
    private router: Router,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.loadNumberOfPosts(this.LOAD_COUNT_NUMBER);
  }

  loadMore() {
    if (this.posts.length !== this.LOAD_COUNT_NUMBER) {
      this.noMore = true;
    }
      this.loadNumberOfPosts(this.LOAD_COUNT_NUMBER);
      this.loadCount += this.LOAD_COUNT_NUMBER;

  }

  // Should be updated to retrieve 10 at a time
  loadNumberOfPosts(numberToLoad: number) {
    this._fl.getApp().content.subscribe('posts', { populate: ['mainImage'] }, (error, data) => {
      if (error) {
        console.error(error);
      }

      const tmp = Object.keys(data).map(key => data[ key ]);
      console.log(tmp);
      this.posts = this.helper.clientSideSortDescending(tmp);
      console.log(this.posts);
    });
  }

  isValid() {
    return false;
  }

  onSelect(post): void {
    // Save the data to pass onto the post-detail component
    this._ds.setData(post);
    // navigate to component
    this.router.navigate(['/detail/' + post.sys.id]);
  }

}
