import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Parameters} from '../../../parameters';
import {UserModel} from './user.model';

@Injectable()
export class UserService  {

  constructor(protected http: Http) {}

  login(username: string, password: string): Observable<any> {
    let contentHeaders = new Headers();
    contentHeaders.append('Accept', 'application/json');
    contentHeaders.append('Content-Type', 'application/json');

    let body = JSON.stringify({ 'username': username, 'password': password });

    return this.http.post(Parameters.USER_SERVICE_API + '/login', body, { headers: contentHeaders })
      .map((response: Response) => {
        return response.json().token;
      })
    ;
  }

  findUsersByTerm(query: string): Observable<UserModel[]> {
    let searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set('limit', String(10));
    query !== null ? searchParams.set('term', String(query)) : null;

    let url: string = Parameters.USER_SERVICE_API + '/users';

    return this.http.get(url, {search: searchParams})
      .map((response: Response) => response.json())
      .map((data: any) => {
        let users: UserModel[] = [];
        if(data instanceof Array) {
          data.forEach((raw: any) => {
            users.push(new UserModel(raw));
          });
        }

        return users;
      })
    ;
  }
}
