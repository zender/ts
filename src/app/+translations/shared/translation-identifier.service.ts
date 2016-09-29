import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Option} from '../../shared/testbirds/shared/option.model';
import {TranslationIdentifierModel} from './translation_identifier.model';
import {Collection} from '../../shared/testbirds/shared/collection';
import {TranslationIdentifierFormModel} from './translation_identifier_form.model';
import {BackendService} from '../../shared/services/backend.service';

@Injectable()
export class TranslationIdentifierService {

  protected resource: any;

  constructor(protected service: BackendService) {
    this.resource = service.getResource('translation-identifiers');
  }

  find(projectId: string, page: number = 1, criteria: TranslationCriteria = null)
    : Observable<Collection<TranslationIdentifierModel>> {

    if(null === criteria) {
      criteria = new TranslationCriteria();
    }

    let skip: number = page - 1;
    let query: any = {
      'project': projectId,
      'translationState': TranslationStateEnum[criteria.translationState],
      '$skip': skip,
      '$limit': criteria.limit
    };

    if(criteria.term) {
      query.term = criteria.term;
    }

    let promise: Promise<any> = this.resource.find({
      'query': query
    });

    return  Observable.fromPromise(promise)
      .map((data: any) => {
        return new Collection<TranslationIdentifierModel>(
          data, (item: any): TranslationIdentifierModel=> new TranslationIdentifierModel(item)
        );
      })
    ;
  }

  create(projectId: string, data: TranslationIdentifierFormModel)
    : Observable<TranslationIdentifierModel> {

    let promise: Promise<any> = this.resource.create(data, {'query': {'project': projectId}});

    return  Observable.fromPromise(promise)
      .map((data: any) => {
        return new TranslationIdentifierModel(data);
      })
    ;
  }

  update(projectId: string, translationIdentifierId: string, data: TranslationIdentifierFormModel)
    : Observable<any> {

    let promise: Promise<any> = this.resource.patch(translationIdentifierId, data, {'query': {
      'project': projectId
    }});

    return  Observable.fromPromise(promise);
  }

  delete(projectId: string, translationIdentifierId: string): Observable<any> {
    let promise: Promise<any> = this.resource.remove(translationIdentifierId, {'query': {
      'project': projectId
    }});

    return  Observable.fromPromise(promise);
  }

  normalize(value: string): string {
    return value.replace(/\s+/g, '_').replace(/[^a-zA-Z_.]/g,'');
  }

  getTranslationStateOptions(): Option[] {
    return [
      new Option({'id': TranslationStateEnum.ALL, 'label': TranslationStateEnum[TranslationStateEnum.ALL]}),
      new Option({'id': TranslationStateEnum.TRANSLATED, 'label': TranslationStateEnum[TranslationStateEnum.TRANSLATED]}),
      new Option({'id': TranslationStateEnum.NOT_TRANSLATED, 'label': TranslationStateEnum[TranslationStateEnum.NOT_TRANSLATED]})
    ];
  }

}

export class TranslationCriteria {

  term: string;

  translationState: TranslationStateEnum;

  limit: number;

  constructor(obj?: any) {
    this.term   = obj && obj.term || null;
    this.translationState   = obj && obj.translationState || TranslationStateEnum.ALL;
    this.limit = obj && obj.limit || 10;
  }
}

export enum TranslationStateEnum {
  ALL = 1,
  TRANSLATED = 2,
  NOT_TRANSLATED = 3
}

