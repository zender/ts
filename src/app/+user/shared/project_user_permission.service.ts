import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ProjectUserPermissionModel} from './project_user_permission.model';
import {BackendService} from '../../shared/services/backend.service';

@Injectable()
export class ProjectUserPermissionService {

  protected resource: any;

  constructor(protected service: BackendService) {
    this.resource = service.getResource('user-permissions');
  }

  getPermissions(projectId: string)
    : Observable<ProjectUserPermissionModel[]> {

    let promise: Promise<any> = this.resource.find({'query': {'project': projectId}});

    return  Observable.fromPromise(promise)
      .map((data: any[]) => {
        let collection: ProjectUserPermissionModel[] = [];
        data.forEach((row: any) => collection.push(new ProjectUserPermissionModel(row)));

        return collection;
      })
    ;
  }

  updatePermission(projectId: string, permission: ProjectUserPermissionModel): Observable<any> {
    let promise: Promise<any> =
      this.resource.update(permission.user.id, permission, {'query': {'project': projectId}}, permission);

    return  Observable.fromPromise(promise);
  }

  deletePermission(projectId: string, userId: string): Observable<any> {
    let promise: Promise<any> = this.resource.remove(userId, {'query': {'project': projectId}});
    return  Observable.fromPromise(promise);
  }
}
