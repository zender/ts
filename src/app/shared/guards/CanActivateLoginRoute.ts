import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {AuthService} from '../testbirds/security/auth.service';

@Injectable()
export class CanActivateLoginRoute implements CanActivate {

  constructor(protected authService: AuthService, protected router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    return !this.authService.isLoggedIn();
  }
}