import {Component, forwardRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AutocompleteMultiComponent} from '../../shared/testbirds/tb-form/autocomplete/autocomplete-multi.component';
import {LanguageService} from '../shared/language.service';

export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LanguageAutocompleteComponent),
  multi: true
};


@Component({
  moduleId: module.id,
  selector: 'tb-language-autocomplete',
  templateUrl: 'language-autocomplete.component.html',
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
export class LanguageAutocompleteComponent extends AutocompleteMultiComponent {
  constructor(languageService: LanguageService){
    super();
    this.service = languageService;
  }
}
