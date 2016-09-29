import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {
  ProjectUserPermissionService,
} from '../shared/project_user_permission.service';
import {ProjectUserPermissionModel} from '../shared/project_user_permission.model';
import {ActivatedRoute} from '@angular/router';
import {TestbirdsInputDebounceComponent} from '../../shared/testbirds/tb-form/tb-input-debounce.component';
import {TestbirdsSelectComponent} from '../../shared/testbirds/tb-form/tb-form-select.component';
import {ErrorHandlerService} from '../../shared/testbirds/shared/error_handler.service';
import {Option} from '../../shared/testbirds/shared/option.model';
import {ProjectRowComponent} from '../../+project/project-row/project-row.component';
const _ = require('lodash');

@Component({
  moduleId: module.id,
  selector: 'tb-user-management',
  templateUrl: 'user-management.component.html',
  providers: [ProjectUserPermissionService],
  directives: [ProjectRowComponent, TestbirdsInputDebounceComponent, TestbirdsSelectComponent],
  pipes: [TranslatePipe]
})
export class UserManagementComponent implements OnInit {

  projectId: string;

  loadedUserPermissions: ProjectUserPermissionModel[] = [];

  userPermissions: ProjectUserPermissionModel[] = [];

  loading: boolean = true;

  term: string = '';

  orderBy: string = 'LATEST_ADDED';

  constructor(protected route: ActivatedRoute, protected errorHandlerService: ErrorHandlerService,
              protected userPermissionService: ProjectUserPermissionService) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
    this.loadUserPermissions();
  }

  get orderByOptions(): Option[] {
    return [
      new Option({
        'id': 'LATEST_ADDED',
        'label': 'LATEST_ADDED'}
      ),
      new Option({
        'id': 'ALPHABETIC',
        'label': 'ALPHABETIC'}
      )
    ];
  }

  onOrderChange(option: Option): void {
    this.orderBy = option.id;
    this.orderUserPermissions();
  }

  orderUserPermissions(): void {
    let permissions: ProjectUserPermissionModel[] =
      _.sortBy(this.userPermissions, (permission: ProjectUserPermissionModel): any[] => {
        if(this.orderBy === 'LATEST_ADDED') {
          return [permission.createdAt];
        } else {
          return [permission.user.username];
        }
      }
    );

    if(this.orderBy === 'LATEST_ADDED') {
      permissions = _(permissions).reverse().value();
    }

    this.userPermissions = permissions;
  }

  filterUserPermissions(term: string): void {
    if(term) {
      this.userPermissions = this.loadedUserPermissions.filter((permission) => {
        let expr: RegExp = new RegExp(`^${term}`, 'i');
        let match1: boolean = permission.user.firstname.search(expr) >= 0;
        let match2: boolean = permission.user.lastname.search(expr) >= 0;
        let match3: boolean = permission.user.username.search(expr) >= 0;
        let match4: boolean = permission.user.username.search(expr) >= 0;

        return match1 || match2 || match3 || match4;
      });
    } else {
      this.loadUserPermissions();
    }
  }

  enableOwnerRights(userPermission: ProjectUserPermissionModel): void {
    userPermission.enableOwnerRights();

    this.userPermissionService.updatePermission(this.projectId, userPermission)
      .subscribe(() => true);
  }

  disableOwnerRights(userPermission: ProjectUserPermissionModel): void {
    userPermission.disableOwnerRights();

    this.userPermissionService.updatePermission(this.projectId, userPermission)
      .subscribe(() => true);
  }

  removePermission(userPermission: ProjectUserPermissionModel): void {
    let idx: number = this.userPermissions.indexOf(userPermission);
    this.userPermissions.splice(idx, 1);

    this.userPermissionService.deletePermission(this.projectId, userPermission.user.id)
      .subscribe(() => true);
  }

  protected loadUserPermissions() {
    this.loading = true;
    this.userPermissionService.getPermissions(this.projectId)
      .subscribe(
        (permissions: ProjectUserPermissionModel[]) => {
          this.userPermissions = permissions;
          this.loadedUserPermissions = permissions;
          this.orderUserPermissions();
          this.loading = false;
        },
        (error: any) => this.errorHandlerService.handleErrors(error)
      )
    ;
  }
}