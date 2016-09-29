import {Observable} from 'rxjs/Rx';
import {Option} from '../../shared/option.model';

export interface AutocompleteAwareInterface {
  getSuggestions(query: string): Observable<Option[]>;
  findSelectedOption(id: any): Observable<Option>;
}