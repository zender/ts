import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Option} from '../../shared/testbirds/shared/option.model';
import {Subject} from 'rxjs/Rx';
import {ProjectModel} from './project.model';
import {ProjectFormModel} from './project_form.model';
import {Collection} from '../../shared/testbirds/shared/collection';
import {BackendService} from '../../shared/services/backend.service';


@Injectable()
export class ProjectService {

  /**
   * Dispatch an event wich informs all subscriber that project should e updated
   *
   * @type {EventEmitter<string>}
   */
  protected triggerProjectUpdate: EventEmitter<string> = new EventEmitter<string>();

  protected latestProject: Subject<ProjectModel> = new Subject<ProjectModel>();

  protected resource: any;

  constructor(protected service: BackendService) {
    this.resource = service.getResource('projects');
  }

  getProjects(page: number = 1, term: string = null, enabled: boolean = null): Observable<Collection<ProjectModel>> {
    let skip: number = page - 1;
    let promise: Promise<any> = this.resource.find({
      'term': term,
      'enabled': enabled,
      '$skip': skip
    });

    return  Observable.fromPromise(promise)
      .map((data: any) => {
        return new Collection<ProjectModel>(data, (item: any): ProjectModel => new ProjectModel(item));
      })
    ;
  }

  getProject(id: string): Observable<ProjectModel> {
    let promise: Promise<any> = this.resource.get(id);

    return  Observable.fromPromise(promise)
      .map((data: any) => {
        let project: ProjectModel = new ProjectModel(data);
        this.latestProject.next(project);
        return project
      })
    ;
  }

  toggleEnableProject(id: string, enabled: boolean): Observable<any> {
    return Observable.fromPromise(this.resource.patch(id, {'enabled': enabled}));
  }

  /**
   * Get available projects to inherit
   *
   * @param limit
   * @returns {Observable<R>}
   */
  getProjectsAsOptions(term: string ='', inherited: boolean = true): Observable<Option[]> {

    let promise: Promise<any> = this.resource.find({
      'term': term,
      'inheritedProject': inherited,
      'enabled': true,
      '$skip': 0
    });

    return  Observable.fromPromise(promise)
      .map((res: any) => {
        let options: Option[] = [];
        if(Array.isArray(res.data)) {
          res.data.forEach((row: any) => options.push(new Option({
            'id':    row._id,
            'label': row.title
          })));
        }

        return options;
      })
    ;
  }

  create(data: ProjectFormModel): Observable<ProjectModel> {

    let promise: Promise<any> = this.resource.create(data);

    return  Observable.fromPromise(promise)
      .map((data: any) => {
        return new ProjectModel(data);
      })
    ;
  }

  update(projectId: string, data: ProjectFormModel): Observable<any> {

    let promise: Promise<any> = this.resource.patch(projectId, data);
    return  Observable.fromPromise(promise);
  }

  triggerUpdate(projectId: string): void {
    this.triggerProjectUpdate.emit(projectId);
  }

  onProjectChange(): Observable<string> {
    return this.triggerProjectUpdate.asObservable();
  }

  getProjectObservable(): Observable<ProjectModel> {
    return this.latestProject.asObservable();
  }
}
