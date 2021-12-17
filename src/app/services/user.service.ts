import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) {
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}`);
  }

  createUser(data): Observable<User> {
    return this.httpClient.post<User>(`${this.url}`, data);
  }

  getUserById(id) {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  updateUser(id, data) {
    return this.httpClient.put<User>(`${this.url}/${id}`, data);
  }
}

