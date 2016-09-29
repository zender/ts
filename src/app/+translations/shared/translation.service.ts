import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {TranslationFormModel} from './translation_form.model';
import {TranslationModel} from './translation.model';
import {BackendService} from '../../shared/services/backend.service';

@Injectable()
export class TranslationService {

  protected resource: any;

  constructor(protected service: BackendService) {
    this.resource = service.getResource('translations');
  }

  get(projectId: string, translationIdentifierId: string, lang: string): Observable<TranslationModel> {
    let query = {
      'project': projectId,
      'translationIdentifier': translationIdentifierId
    };

    let promise: Promise<any> = this.resource.get(lang, {
      'query': query,
    });

    return  Observable.fromPromise(promise)
      .map((data: any) => {
        return new TranslationModel(data)
      })
    ;
  }

  patch(projectId: string, translationIdentifierId: string, lang: string, data: TranslationFormModel)
    : Observable<any> {

    let query = {
      'project': projectId,
      'translationIdentifier': translationIdentifierId
    };

    let promise: Promise<any> = this.resource.patch(lang, data, {'query': query});

    return Observable.fromPromise(promise);
  }

  patchAndGet(projectId: string, translationIdentifierId: string, lang: string, data: TranslationFormModel)
    : Observable<any> {

    return Observable.fromPromise(this.patch(projectId, translationIdentifierId, lang, data).toPromise().then(() => {
      return this.get(projectId, translationIdentifierId, lang).toPromise();
    }));
  }
}


