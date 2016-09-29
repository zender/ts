import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {Injectable} from '@angular/core';
import {ReplaySubject, Observable} from 'rxjs/Rx';
import {UserModel} from '../../../+user/shared/user.model';

@Injectable()
export class AuthService {

  protected jwtHelper: JwtHelper;

  protected userStream: ReplaySubject<UserModel> = new ReplaySubject<UserModel>();

  constructor() {
    this.jwtHelper = new JwtHelper();
    this.userStream.next(this.getUser());
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
    this.userStream.next(this.getUser());
  }

  removeToken(): void {
    localStorage.removeItem('jwt');
    this.userStream.next(null);
  }

  getToken(): string {
    return localStorage.getItem('jwt');
  }

  refreshToken(): void {
    throw new Error('Method refreshToken is not implemented');
  }

  getJwtHelper() : JwtHelper {
    return this.jwtHelper;
  }

  getUser() : UserModel {
    let token: string = this.getToken();

    if(!token || this.getJwtHelper().isTokenExpired(token)) {
      return null;
    }

    return new UserModel(this.getJwtHelper().decodeToken(token));
  }

  isLoggedIn(): boolean {
    return null !== this.getUser();
  }

  public hasRole(role: string) {
    return this.isLoggedIn() && this.getUser().hasRole(role);
  }

  getUserObservable(): Observable<UserModel> {
    return this.userStream.publishReplay(1).refCount();
  }
}
