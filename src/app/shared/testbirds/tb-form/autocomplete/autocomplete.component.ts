import {Component, forwardRef, EventEmitter} from '@angular/core';
import {ControlValueAccessor, AbstractControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AutocompleteAwareInterface} from './autocomplete_aware.interface';
import {Option} from '../../shared/option.model';

export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'tb-autocomplete',
  templateUrl: 'autocomplete.component.html',
  providers: [CONTROL_VALUE_ACCESSOR],
  inputs: [
    'service',
    'ngFormControl',
    'placeholder',
    'noResultMessage',
    'initialOption'
  ],
  outputs: [
    'onSelectOption',
    'onRemoveOption'
  ],
})
export class AutocompleteComponent implements ControlValueAccessor {

  service: AutocompleteAwareInterface;

  ngFormControl: AbstractControl;

  placeholder: string;

  noResultMessage: string;

  onSelectOption: EventEmitter<Option> = new EventEmitter<Option>();

  onRemoveOption: EventEmitter<Option> = new EventEmitter<Option>();

  selectedOption: Option;

  value: any;

  onChange:any = Function.prototype;

  onTouched:any = Function.prototype;

  query: string = '';

  options: Option[] = [];

  loading: boolean = false;

  timeout: any;

  focused: boolean = false;

  suggestionsHidden: boolean = true;

  noResult: boolean = false;

  set initialOption(id: any) {
    this.service.findSelectedOption(id)
      .subscribe((option: Option) => option? this.selectOption(option) : this.resetOption())
    ;
  }

  onQueryChange(query: string): void {
    this.query = query;

    if(query.length > 1) {

      if(this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.suggestionsHidden = false;
        this.loadSuggestions(query);
      }, 200);
    } else {
      this.options = [];
    }
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

  selectOption(option: Option): boolean {
    this.selectedOption = option;
    this.onChange(option.id);
    this.query = option.label;
    this.onSelectOption.emit(option);

    return false;
  }

  removeOption(option: Option): boolean {
    this.selectedOption = null;
    this.onChange(null);
    this.query = '';
    this.onRemoveOption.emit(option);

    return false;
  }

  resetOption(): void {
    this.selectedOption = null;
    this.onChange(null);
    this.query = '';
  }

  onBlurred(): void {
    this.onTouched();
    this.focused = false;

    this.timeout = setTimeout(() => {
      this.suggestionsHidden = true;
      this.clearQuery();
      this.options = [];
    }, 200);
  }

  onFocused(): void {
    this.suggestionsHidden = false;
    this.focused = true;
    this.loadSuggestions('');
  }

  onSuggestionsMouseLeave(): void {
    if(!this.focused) {
      this.suggestionsHidden = true;
    }
  }

  protected clearQuery(): void {
    this.query = this.selectedOption ? this.selectedOption.label : '';
  }

  protected loadSuggestions(query: string): void {
    this.options = [];
    let selectedOption: Option = this.selectedOption;

    this.service.getSuggestions(query)
      .subscribe((options: Option[]) => {
        this.loading = false;
        this.noResult = options.length === 0;

        options
          .filter((option: Option) => {
            return !(selectedOption && selectedOption.id === option.id);
          })
          .map((option: Option) => this.options.push(option))
        ;
      });
  }
}
