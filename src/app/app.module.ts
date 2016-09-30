import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';

import {TranslateModule, TranslatePipe} from 'ng2-translate/ng2-translate';
import {CanActivateLoginRoute} from './shared/guards/CanActivateLoginRoute';
import {CanActivateRoute} from './shared/guards/CanActivateRoute';
import {AuthService} from './shared/testbirds/security/auth.service';
import {UserService} from './+user/shared/user.service';
import {CookieService} from 'angular2-cookie/core';
import {BackendService} from './shared/services/backend.service';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import {LoginComponent} from './+login/login.component';
import {DashboardComponent} from './+dashboard/dashboard.component';
import {ProjectFormComponent} from './+project/project-form/project-form.component';
import {UserManagementComponent} from './+user/user-management/user-management.component';
import {ProjectInfoComponent} from './+project/project-info/project-info.component';
import {TranslationIdAddComponent} from './+translations/translation-id-add/translation-id-add.component';
import {TranslationsComponent} from './+translations/translations.component';
import {BuildListComponent} from './+build/build-list/build-list.component';
import {NoContentComponent} from './+no-content/no-content.component';
import {AlertComponent} from 'ng2-bootstrap';
import {TestbirdsTextComponent} from './shared/testbirds/tb-form/tb-form-text.component';
import {ErrorHandlerService} from './shared/testbirds/shared/error_handler.service';
import {ProjectRowComponent} from './+project/project-row/project-row.component';
import {BuildRowComponent} from './+build/build-row/build-row.component';
import {TestbirdsInputDebounceComponent} from './shared/testbirds/tb-form/tb-input-debounce.component';
import {BuildFormComponent} from './+build/build-form/build-form.component';
import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import {LanguageStatComponent} from './+language/language-stat/language-stat.component';
import {ProjectActionsComponent} from './+project/project-actions/project-actions.component';
import {TestbirdsIconComponent} from './shared/testbirds/tb/icon/tb-icon.component';
import {ProjectLogoComponent} from './+project/project-logo/project-logo.component';
import {TestbirdsIconButtonComponent} from './shared/testbirds/tb/icon-button/tb-icon-button.component';
import {TestbirdsColorboxDirective} from './shared/testbirds/directives/colorbox';
import {TestbirdsImageFilterPipe} from './shared/testbirds/tb-form/image-upload/image-filter.pipe';
import {TestbirdsAlertComponent} from './shared/testbirds/tb/alert/alert.component';
import {TestbirdsImageUploadComponent} from './shared/testbirds/tb-form/image-upload/tb-image-upload.component';
import {NotificationListComponent} from './+notification/notification-list.component';
import {ProjectListComponent} from './+project/project-list/project-list.component';
import {DatePipe} from '@angular/common';
import {ProjectSearchComponent} from './+project/project-search/project-search.component';
import {NavbarComponent} from './+layout/navbar/navbar.component';
import {ToolbarComponent} from './+layout/toolbar/toolbar.component';
import {AlertService} from './shared/testbirds/tb/alert/alert.service';
import {
  TestbirdsPanelWrapperComponent,
  TestbirdsPanelHeaderComponent
} from './shared/testbirds/tb-panel/tb-panel.component';
import {TestbirdsSelectComponent} from './shared/testbirds/tb-form/tb-form-select.component';
import {AutocompleteComponent} from './shared/testbirds/tb-form/autocomplete/autocomplete.component';
import {AutocompleteMultiComponent} from './shared/testbirds/tb-form/autocomplete/autocomplete-multi.component';
import {LanguageFormComponent} from './+language/language-form/language-form.component';
import {TranslationDomainFormComponent} from './+translation-domain/translation-domain-form/translation-domain-form.component';
import {UserFormComponent} from './+user/user-form/user-form.component';
import {LanguageAutocompleteComponent} from './+language/language-autocomplete/language-autocomplete.component';
import {TranslationDomainAutocompleteComponent} from './+translation-domain/translation-domain-autocomplete/translation-domain-autocomplete.component';
import {UserAutocompleteComponent} from './+user/user-autocomplete/user-autocomplete.component';
import {TranslationIdAddFormComponent} from './+translations/translation-id-add-form/translation-id-add-form.component';
import {TranslationDomainAddFormComponent} from './+translation-domain/translation-domain-add-form/translation-domain-add-form.component';
import {TranslationListComponent} from './+translations/translation-list/translation-list.component';
import {TestbirdsDropdownComponent} from './shared/testbirds/tb/dropdown/tb-dropdown.component';
import {LanguageDropdownComponent} from './+language/language-dropdown/language-dropdown.component';
import {TranslationRowComponent} from './+translations/translation-row/translation-row.component';
import {TranslationContentComponent} from './+translations/translation-content/translation-content.component';
import {TestbirdsTextareaComponent} from './shared/testbirds/tb-form/tb-form-textarea.component';


// Application wide providers
const APP_PROVIDERS = [
  CanActivateLoginRoute,
  CanActivateRoute,
  AuthService,
  BackendService,
  CookieService,
  UserService,
  ErrorHandlerService,
  AlertService
];


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProjectFormComponent,
    UserManagementComponent,
    ProjectInfoComponent,
    TranslationIdAddComponent,
    TranslationsComponent,
    BuildListComponent,
    NoContentComponent,
    AlertComponent,
    TestbirdsTextComponent,
    ProjectRowComponent,
    ProjectSearchComponent,
    BuildRowComponent,
    TestbirdsInputDebounceComponent,
    BuildFormComponent,
    LanguageStatComponent,
    ProjectActionsComponent,
    TestbirdsIconComponent,
    ProjectLogoComponent,
    TestbirdsIconButtonComponent,
    TestbirdsAlertComponent,
    TestbirdsImageUploadComponent,
    NotificationListComponent,
    ProjectListComponent,
    NavbarComponent,
    ToolbarComponent,
    TestbirdsPanelWrapperComponent,
    TestbirdsPanelHeaderComponent,
    TestbirdsSelectComponent,
    AutocompleteComponent,
    AutocompleteMultiComponent,
    LanguageFormComponent,
    TranslationDomainFormComponent,
    UserFormComponent,
    LanguageAutocompleteComponent,
    TranslationDomainAutocompleteComponent,
    UserAutocompleteComponent,
    TranslationIdAddFormComponent,
    TranslationDomainAddFormComponent,
    TranslationListComponent,
    TestbirdsColorboxDirective,
    TestbirdsImageFilterPipe,
    TestbirdsDropdownComponent,
    LanguageDropdownComponent,
    TranslationRowComponent,
    TranslationContentComponent,
    TestbirdsTextareaComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    TranslateModule.forRoot(),
    ButtonsModule,
    TooltipModule,
    DropdownModule,
    FileUploadModule,
    PaginationModule,
    TabsModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {}

