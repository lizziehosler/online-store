import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../common/book';
import {map} from 'rxjs/operators';
import {Genre} from '../common/genre';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = 'http://localhost:8080/api/books';

  constructor(private httpClient: HttpClient) {
  }

  getBookList(): Observable<Book[]> {
    return this.httpClient.get<GetResponse>(`${this.url}`).pipe(map(response => response._embedded.books));
  }

  createBook(data): Observable<Book> {
    return this.httpClient.post<Book>(`${this.url}`, data);
  }

  getBookById(id) {
    return this.httpClient.get<Book>(`${this.url}/${id}`);
  }

  getGenreByBookId(id) {
    return this.httpClient.get<Genre>(`${this.url}/${id}/genre`);
  }

  updateBook(id, data) {
    return this.httpClient.put<Book>(`${this.url}/${id}`, data);
  }

  deleteBook(id) {
    return this.httpClient.delete<Book>(`${this.url}/${id}`);
  }


}

interface GetResponse {
  _embedded: {
    books: Book[]
  };
}
