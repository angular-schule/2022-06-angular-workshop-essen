import { Book } from './book';
import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {

  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    service = new BookRatingService();
    book = {
      isbn: '000',
      title: 'Test',
      description: 'Test',
      rating: 3
    };
  });

  it('should rate up a book by one', () => {
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(4);
  });

  // [JIRA-12123] Bewertungen wie bei Amazon
  it('should rate down a book by one [JIRA-1223]', () => {
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not be allowed to have a rating greater than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not be allowed to have a rating smaler than 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });

  // it('should return a new book instance (assuming immutability)', () => {
  //   const ratedBook = service.rateUp(book);
  //   expect(ratedBook).not.toBe(book);

  //   const ratedBook2 = service.rateDown(book);
  //   expect(ratedBook2).not.toBe(book);
  // });

  it('should not mutate the original book', () => {
    const originalBook = { ...book };
    service.rateUp(book);
    expect(originalBook).toEqual(book);
  });
});
