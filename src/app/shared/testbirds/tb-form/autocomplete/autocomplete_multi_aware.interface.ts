import {Observable} from 'rxjs/Rx';
import {Option} from '../../shared/option.model';

export interface AutocompleteMultiAwareInterface {
  getSuggestions(query: string): Observable<Option[]>;
  findSelectedOptions(ids: any[]): Observable<Option[]>;
}