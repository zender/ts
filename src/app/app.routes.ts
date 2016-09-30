import { Routes, RouterModule } from '@angular/router';
import {CanActivateRoute} from './shared/guards/CanActivateRoute';
import {CanActivateLoginRoute} from './shared/guards/CanActivateLoginRoute';
import {ProjectFormComponent} from './+project/project-form/project-form.component';
import {UserManagementComponent} from './+user/user-management/user-management.component';
import {ProjectInfoComponent} from './+project/project-info/project-info.component';
import {TranslationIdAddComponent} from './+translations/translation-id-add/translation-id-add.component';
import {TranslationsComponent} from './+translations/translations.component';
import {BuildListComponent} from './+build/build-list/build-list.component';
import {LoginComponent} from './+login/login.component';
import {DashboardComponent} from './+dashboard/dashboard.component';
import {NoContentComponent} from './+no-content/no-content.component';


export const ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [CanActivateLoginRoute]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRoute]
  },
  {
    path: 'projects/:mode',
    component: ProjectFormComponent,
    canActivate: [CanActivateRoute]
  },
  {
    path: 'users-management/:projectId',
    component: UserManagementComponent,
    canActivate: [CanActivateRoute]
  },
  {
    path: 'project-info/:projectId',
    component: ProjectInfoComponent,
    canActivate: [CanActivateRoute]
  },
  {
    path: 'translation-id-add/:projectId',
    component: TranslationIdAddComponent,
    canActivate: [CanActivateRoute]
  },
  {
    path: 'translations/:projectId',
    component: TranslationsComponent,
    canActivate: [CanActivateRoute]
  },
  {
    path: 'project-builds/:projectId',
    component: BuildListComponent,
    canActivate: [CanActivateRoute]
  },
  { path: '**',    component: NoContentComponent },
];

