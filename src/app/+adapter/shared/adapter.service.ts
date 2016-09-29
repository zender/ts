import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs/Rx';
import {AdapterModel} from './adapter.model';
import {Option} from '../../shared/testbirds/shared/option.model';
import {AutocompleteMultiAwareInterface} from '../../shared/testbirds/tb-form/autocomplete/autocomplete_multi_aware.interface';
import {BackendService} from '../../shared/services/backend.service';

@Injectable()
export class AdapterService implements AutocompleteMultiAwareInterface {

  protected adaptersSubject: ReplaySubject<AdapterModel[]> = new ReplaySubject<AdapterModel[]>();

  protected resource: any;

  constructor(protected service: BackendService) {
    this.resource = this.service.getResource('adapters');
  }

  loadAdapters(): void {
    Observable.fromPromise(this.resource.find())
      .map((data: Array<any>) => {
        let collection: AdapterModel[] = [];
        data.forEach((row: any) => collection.push(new AdapterModel(row)));
        return collection;
      })
      .subscribe(
        (adapters: AdapterModel[]) => this.adaptersSubject.next(adapters)
      )
    ;
  }

  getAdapters(): Observable<AdapterModel[]> {
    return this.adaptersSubject.publishReplay(1).refCount();
  }

  getAdapter(id: string): Observable<AdapterModel> {
    return this.getAdapters().map((adapters: AdapterModel[]) => {
      return adapters.find((adapter: AdapterModel) => adapter.id === id);
    });
  }

  getAdapterOptions(): Observable<Option[]> {
    return this.getAdapters().map((adapters: AdapterModel[]) => {
      return adapters.map((adapter: AdapterModel) => {
        return new Option({'id': adapter.id, 'label': adapter.name})
      })
    });
  }

  getSuggestions(query: string): Observable<Option[]> {
    return this.getAdapterOptions()
      .map((options: Option[]) => {
        return options.filter((option: Option) => option.label.startsWith(query));
      })
    ;
  }

  findSelectedOptions(ids: any[]): Observable<Option[]> {
    return this.getAdapterOptions().map((options: Option[]) => {
      return options.filter((option: Option) => ids.indexOf(option.id) !== -1);
    });
  }
}
