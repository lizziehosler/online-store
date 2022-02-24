import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Genre} from '../common/genre';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private url = 'http://localhost:8080/api/genre';

  constructor(private httpClient: HttpClient) {
  }

  getGenreList(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(this.url).pipe(
      map((result: any) => {
        return result._embedded.genre;
      }));
  }
}

