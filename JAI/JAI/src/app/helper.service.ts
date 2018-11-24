import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  clientSideFilterSort(tmp) {
    // Today object
    const date = new Date();
    // Client-side filtering waiting for flamelink update
    // Iterate to fid expired events
    tmp.forEach(i => {
      // If expired remove element
      if (new Date(i.date) < date) {
        // Splice removes at index, count
        tmp.splice(i, 1);
      }
    });
    // Client-side sorting waiting for flamelink update
    tmp.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      // a - b to sort ascending
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    console.log('client-side sort and filter');
    return tmp;
  }

  clientSideSortDescending(tmp) {
    // Client-side sorting waiting for flamelink update
    tmp.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      // a - b to sort ascending
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    console.log('client-side sort descending');
    return tmp;
  }
}
