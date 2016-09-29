import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Parameters} from '../parameters';
import {LanguageService} from "./+language/shared/language.service";
import {ProjectService} from './+project/shared/project.service';
import {AdapterService} from './+adapter/shared/adapter.service';
import {ErrorHandlerService} from './shared/testbirds/shared/error_handler.service';
import {TestbirdsAlertComponent} from './shared/testbirds/tb/alert/alert.component';
import {AlertService} from './shared/testbirds/tb/alert/alert.service';
import {UserModel} from './+user/shared/user.model';
import {AuthService} from './shared/testbirds/security/auth.service';
import {ToolbarComponent} from './+layout/toolbar/toolbar.component';
import {NavbarComponent} from './+layout/navbar/navbar.component';

@Component({
  moduleId: module.id,
  selector: 'app',
  providers: [LanguageService, AdapterService],
  viewProviders: [ProjectService, ErrorHandlerService, AlertService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  directives: [NavbarComponent, ToolbarComponent, ROUTER_DIRECTIVES, TestbirdsAlertComponent]
})

export class AppComponent implements OnInit {

  user: UserModel;

  constructor(protected router: Router, protected authService: AuthService, protected translate: TranslateService,
              protected languageService: LanguageService, protected adapterService: AdapterService)  {}

  ngOnInit() {
    this.translate.setDefaultLang(Parameters.DEFAULT_LANG);
    this.translate.use(Parameters.DEFAULT_LANG);

    this.authService.getUserObservable().subscribe((user: UserModel) => {
      this.user = user;
      this.fetchData();
    });
  }

  fetchData(): void {
    if(this.authService.isLoggedIn()) {
      this.translate.use(this.user.language);
      this.languageService.loadLanguages();
      this.adapterService.loadAdapters();
    }
  }
}
