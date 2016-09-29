import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Option} from '../../shared/testbirds/shared/option.model';
import {AutocompleteAwareInterface} from '../../shared/testbirds/tb-form/autocomplete/autocomplete_aware.interface';
import {AutocompleteMultiAwareInterface} from '../../shared/testbirds/tb-form/autocomplete/autocomplete_multi_aware.interface';

@Injectable()
export class TranslationDomainService implements AutocompleteAwareInterface, AutocompleteMultiAwareInterface {

  getSuggestions(query: string): Observable<Option[]> {
    let options: Option[] = [];
    //todo replace with real one
    options.push(new Option({'id': 'nest', 'label': 'nest'}));
    options.push(new Option({'id': 'client', 'label': 'client'}));

    return Observable.from([options]);
  }

  findSelectedOption(id: any): Observable<Option> {

    let option: Option = null;

    if(id) {
      option = new Option({
        'id' : id,
        'label': id
      });
    }

    return Observable.from([option]);
  }

  findSelectedOptions(ids: any[]): Observable<Option[]> {
    let options: Option[]
      = ids.map((domain: string) => new Option({'id': domain, 'label': domain}));

    return Observable.from([options]);
  }

  normalize(value: string): string {
    return value.replace(/\s+/g, '_').replace(/[^a-zA-Z_]/g,'');
  }
}
