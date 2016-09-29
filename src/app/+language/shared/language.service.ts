import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs/Rx';
import {LanguageModel} from "./language.model";
import {AutocompleteMultiAwareInterface} from '../../shared/testbirds/tb-form/autocomplete/autocomplete_multi_aware.interface';
import {Option} from '../../shared/testbirds/shared/option.model';
import {BackendService} from '../../shared/services/backend.service';


@Injectable()
export class LanguageService implements AutocompleteMultiAwareInterface {

  protected languagesSubject: ReplaySubject<LanguageModel[]> = new ReplaySubject<LanguageModel[]>();

  protected resource: any;

  constructor(protected service: BackendService) {
    this.resource = this.service.getResource('languages');
  }

  loadLanguages(): void {
    Observable.fromPromise(this.resource.find())
      .map((data: Array<any>) => {
        let collection: LanguageModel[] = [];
        data.forEach((row: any) => collection.push(new LanguageModel(row)));
        return collection;
      })
      .subscribe((languages: LanguageModel[]) => {
        this.languagesSubject.next(languages);
      })
    ;
  }

  getLanguageCodes(): Observable<string[]> {
    return this.getLanguagesAsObservable().map((languages: LanguageModel[]) => {
      return languages.map((language: LanguageModel) => language.code)
    });
  }

  getLanguageOptions(): Observable<Option[]> {
    return this.getLanguagesAsObservable().map((languages: LanguageModel[]) => {
      return languages.map((language: LanguageModel) => {
        return new Option({'id': language.code, 'label': language.name, 'extraData': {'language': language}})
      })
    });
  }

  getSuggestions(query: string): Observable<Option[]> {
    return this.getLanguageOptions()
      .map((options: Option[]) => {
        return options.filter((option: Option) => option.label.startsWith(query));
      })
    ;
  }

  findSelectedOptions(ids: any[]): Observable<Option[]> {
    return this.getLanguageOptions().map((options: Option[]) => {
      return options.filter((option: Option) => ids.indexOf(option.id) !== -1);
    });
  }

  getLanguagesAsObservable(): Observable<LanguageModel[]> {
    return this.languagesSubject.publishReplay(1).refCount();
  }

  getLanguageAsObservable(code: string): Observable<LanguageModel> {
    return this.getLanguagesAsObservable().map((languages: LanguageModel[]) => {
      return languages.find((language: LanguageModel) => language.code === code);
    });
  }
}
