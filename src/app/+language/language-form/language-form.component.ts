import {Component, forwardRef} from '@angular/core';
import {Option} from '../../shared/testbirds/shared/option.model';
import {AutocompleteMultiComponent} from '../../shared/testbirds/tb-form/autocomplete/autocomplete-multi.component';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES, AbstractControl} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LanguageFormComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'tb-language-form',
  templateUrl: 'language-form.component.html',
  providers: [LANGUAGE_CONTROL_VALUE_ACCESSOR],
  directives: [BUTTON_DIRECTIVES, CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  inputs: ['autocompleteWidget', 'ngFormControl', 'isCreateMode']
})
export class LanguageFormComponent implements ControlValueAccessor {

  autocompleteWidget: AutocompleteMultiComponent;

  ngFormControl: AbstractControl;

  value: any;

  onChange:any = Function.prototype;

  onTouched:any = Function.prototype;

  mode: string;

  isCreateMode: boolean = true;

  get options(): Option[] {
    return this.autocompleteWidget.selectedOptions;
  }

  set defaultLanguage(defaultLanguage: string) {
    this.writeValue(defaultLanguage);
    this.onChange(defaultLanguage);
  }

  get defaultLanguage() : string {
    return this.value;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  removeOption(option: Option): void {
    this.autocompleteWidget.removeOption(option);

    if(this.isDefautLanguage(option)) {
      this.defaultLanguage = null;
    }
  }

  isDefautLanguage(option: Option): boolean {
    return option.id === this.value;
  }
}
