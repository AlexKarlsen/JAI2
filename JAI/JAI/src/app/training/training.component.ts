import { Component, OnInit } from '@angular/core';
import { FlamelinkService } from '../flamelink.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Observable, of } from 'rxjs';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TrainingComponent implements OnInit {
  constructor(private _fl: FlamelinkService) { }

  times;
  isOdd;

  expandedElement: any;
  displayedColumns: string[] = ['hold', 'dag', 'tid', 'sted'];
  ngOnInit() {
    this._fl.getApp().content.subscribe('teams', (error, data) => {
      if (error) {
        console.error(error);
      }
      const tmp = Object.keys(data).map(key => data[ key ]);
      this.times = new ExampleDataSource(tmp);
      // this.times = data;
      console.log(this.times);
    });

    const date = new Date();
    if ((date.getMonth() + 1) % 2 === 1) {
      this.isOdd = true;
    } else {
      this.isOdd = false;
    }

  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');


}

export class ExampleDataSource extends DataSource<any> {

  constructor(_data) {
    super();
    this.data = _data;
  }
  data;
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    const rows = [];
    this.data.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);
    return of(rows);
  }
  disconnect() { }
}
