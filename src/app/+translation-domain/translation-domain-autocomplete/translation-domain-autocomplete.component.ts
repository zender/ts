import {Component, forwardRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AutocompleteMultiComponent} from '../../shared/testbirds/tb-form/autocomplete/autocomplete-multi.component';
import {AutocompleteNormalizerInterface} from '../../shared/testbirds/tb-form/autocomplete/autocomplete_normalizer.interface';
import {Option} from '../../shared/testbirds/shared/option.model';
import {Observable} from 'rxjs/Rx';
import {AutocompleteMultiAwareInterface} from '../../shared/testbirds/tb-form/autocomplete/autocomplete_multi_aware.interface';

export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TranslationDomainAutocompleteComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'tb-translation-domain-autocomplete',
  templateUrl: 'translation-domain-autocomplete.component.html',
  directives: [CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [CONTROL_VALUE_ACCESSOR],
  inputs: [
    'service',
    'ngFormControl',
    'placeholder',
    'noResultMessage',
    'triggerLoadOnFocus',
    'showSelectedOptions',
    'allowAdd',
    'normalizer',
    'initialOptions'
  ],
  outputs: [
    'onSelectOption',
    'onRemoveOption'
  ]
})
export class TranslationDomainAutocompleteComponent extends AutocompleteMultiComponent
  implements AutocompleteNormalizerInterface, AutocompleteMultiAwareInterface {

  constructor() {
    super();
    this.normalizer = this;
    this.service = this;
  }

  normalize(value: string): string {
    return value.replace(/\s+/g, '_').replace(/[^a-zA-Z_]/g,'');
  }

  getSuggestions(query: string): Observable<Option[]> {
    return Observable.from([[]]);
  }

  findSelectedOptions(ids: any[]): Observable<Option[]> {
    let options: Option[]
      = ids.map((domain: string) => new Option({'id': domain, 'label': domain}));

    return Observable.from([options]);
  }
}
