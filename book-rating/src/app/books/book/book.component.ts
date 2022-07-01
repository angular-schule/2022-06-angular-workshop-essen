import { Component, Input } from '@angular/core';

import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent  {

  // benötigt laut Profiler 1.4ms
  @Input() book?: Book;

  get amountOfStars(): undefined[] {
    return new Array(this.book?.rating);
  }

  // benötigt laut Profiler 1ms (voll schneller 😎)
  // ABER: geht nur wenn Book nicht mutiert wird!
  /*
  _book?: Book;
  amountOfStars: undefined[] = [];

  @Input()
  set book(book: Book | undefined) {
    this._book = book;
    this.amountOfStars = new Array(book?.rating)
  }

  get book(): Book | undefined {
    return this._book;
  }
  */
}
