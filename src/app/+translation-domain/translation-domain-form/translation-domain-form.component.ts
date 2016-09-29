import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {TranslationDomainAutocompleteComponent} from '../translation-domain-autocomplete/translation-domain-autocomplete.component';
import {Option} from '../../shared/testbirds/shared/option.model';

@Component({
  moduleId: module.id,
  selector: 'tb-translation-domain-form',
  templateUrl: 'translation-domain-form.component.html',
  providers: [],
  directives: [CORE_DIRECTIVES],
  inputs: ['autocompleteWidget'],
  outputs: [],
})
export class TranslationDomainFormComponent {

  autocompleteWidget: TranslationDomainAutocompleteComponent;

  get options(): Option[] {
    return this.autocompleteWidget.selectedOptions;
  }

  removeOption(option: Option): void {
    this.autocompleteWidget.removeOption(option);
  }

}
