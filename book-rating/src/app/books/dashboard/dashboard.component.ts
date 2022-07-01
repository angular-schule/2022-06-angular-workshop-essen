import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  books: Book[] = [{
    isbn: '000',
    title: 'Angular',
    description: 'Tolles Buch',
    rating: 5
  }, {
    isbn: '222',
    title: 'Erdbeerinchen Erdbeerfee',
    description: 'Sonnenschein und grüner Klee',
    rating: 4
  }, {
    isbn: '111',
    title: 'AngularJs',
    description: 'Altes Buch',
    rating: 3
  }
  ];

  constructor(private br: BookRatingService) {

  }

  doRateUp(book: Book): void {
    const ratedBook = this.br.rateUp(book);
    this.updateAndSort(ratedBook);
  }

  doRateDown(book: Book): void {
    const ratedBook = this.br.rateDown(book);
    this.updateAndSort(ratedBook);
  }

  updateAndSort(ratedBook: Book): void {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating)
  }
}


