import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/testbirds/security/auth.service';
import {UserModel} from '../../+user/shared/user.model';

@Component({
  moduleId: module.id,
  selector: 'tb-toolbar',
  template: `
    <div class="container-fluid">
    <div class="row">
        <div class="col-xs-6">
            <img src="/assets/jpg/logo.jpg" width="150" alt="" class="logo">
            <div class="label label-white">{{ 'app.title'|translate }}</div>
        </div>
        <div class="col-xs-6">
            <!--<span *ngIf="user"> {{ 'user.greetings'|translate: {'firstname': user.firstname, 'lastname': user.lastname} }}</span>-->
            <ul class="pull-right">
                <li *ngIf="user" (click)="logout()">
                    <a href="#logout" >{{ 'button.logout'|translate }}</a>
                </li>
            </ul>
        </div>
    </div>
</div>
  `,
  styleUrls: ['toolbar.component.scss'],
  inputs: ['user'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {

  user: UserModel;

  constructor(protected authService: AuthService, protected router: Router) {}

  public ngOnInit() {
    this.authService.getUserObservable().subscribe((user: UserModel) => {
        if(!user) {
          this.router.navigate(['']);
        }
      }
    );
  }

  public logout(): boolean {
    this.authService.removeToken();
    return false;
  }
}

