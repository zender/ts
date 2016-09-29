import {Injectable} from '@angular/core';
import {BuildModel} from './build.model';
import {Observable} from 'rxjs/Rx';
import {Collection} from '../../shared/testbirds/shared/collection';
import {BackendService} from '../../shared/services/backend.service';

@Injectable()
export class BuildService {

  protected resource: any;

  constructor(protected service: BackendService) {
    this.resource = service.getResource('builds');
  }

  find(projectId: string, page: number = 1, limit: number = 10, term: string = null)
    : Observable<Collection<BuildModel>> {

    let skip: number = page - 1;

    let query: any = {
      'project': projectId,
      '$skip': skip,
      '$limit': limit
    };

    if(term) {
      query.term = term;
    }

    let promise: Promise<any> = this.resource.find({
      'query': query
    });

    return  Observable.fromPromise(promise)
      .map((data: any) => {
        return new Collection<BuildModel>(
          data, (item: any): BuildModel => new BuildModel(item)
        );
      })
    ;
  }

  create(projectId: string, data: BuildFormModelInterface): Observable<BuildModel> {

    let promise: Promise<any> = this.resource.create(data, {'query': {'project': projectId}});

    return  Observable.fromPromise(promise)
      .map((data: any) => {
        return new BuildModel(data);
      })
    ;
  }

  remove(projectId: string, buildId: string): Observable<any> {
    let promise: Promise<any> = this.resource.remove(buildId, {'query': {
      'project': projectId
    }});

    return  Observable.fromPromise(promise);
  }
}

export interface BuildFormModelInterface {
  name: string;
}
