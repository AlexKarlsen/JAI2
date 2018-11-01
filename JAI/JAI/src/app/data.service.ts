import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private sharedData: any;

  getData() {
    return this.sharedData;
  }

  setData(dataToParse: any) {
    this.sharedData = dataToParse;
  }
}
