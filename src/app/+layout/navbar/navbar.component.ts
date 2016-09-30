import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '../../+user/shared/user.model';

@Component({
  moduleId: module.id,
  selector: 'tb-navbar',
  template: `
    <a *ngIf="showDashboardLink()" [routerLink]="['/dashboard']" >{{ 'link.go_to_dashboard' }}</a>
  `,
  styleUrls: ['navbar.component.scss'],
  inputs: ['user'],
})
export class NavbarComponent {

  user: UserModel;

  constructor(protected router: Router ) {}

  showDashboardLink(): boolean {
    return this.user && this.router.createUrlTree(['dashboard']).toString() !== this.router.url;
  }
}
