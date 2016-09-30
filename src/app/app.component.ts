import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Parameters} from '../parameters';
import {LanguageService} from "./+language/shared/language.service";
import {ProjectService} from './+project/shared/project.service';
import {AdapterService} from './+adapter/shared/adapter.service';
import {UserModel} from './+user/shared/user.model';
import {AuthService} from './shared/testbirds/security/auth.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app',
  providers: [LanguageService, AdapterService],
  viewProviders: [ProjectService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
