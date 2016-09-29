import {Component, forwardRef, EventEmitter} from '@angular/core';
import {ControlValueAccessor, AbstractControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AutocompleteMultiAwareInterface} from './autocomplete_multi_aware.interface';
import {AutocompleteNormalizerInterface} from './autocomplete_normalizer.interface';
import {Option} from '../../shared/option.model';

export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteMultiComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'tb-autocomplete-multi',
  templateUrl: 'autocomplete-multi.component.html',
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
export class AutocompleteMultiComponent implements ControlValueAccessor {

  service: AutocompleteMultiAwareInterface;

  ngFormControl: AbstractControl;

  placeholder: string;

  noResultMessage: string;

  triggerLoadOnFocus: boolean = false;

  showSelectedOptions: boolean = true;

  allowAdd: boolean = false;

  normalizer: AutocompleteNormalizerInterface = null;

  onSelectOption: EventEmitter<Option> = new EventEmitter<Option>();

  onRemoveOption: EventEmitter<Option> = new EventEmitter<Option>();

  selectedOptions: Option[] = [];

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

  set initialOptions(ids: any[]) {
    if(ids.length > 0) {
      this.service.findSelectedOptions(ids)
        .subscribe((options: Option[]) => {
          options.forEach((option: Option) => this.selectOption(option))
        })
      ;
    }
  }

  onQueryChange(query: string): void {

    if(query.length > 1) {
      this.query = query;

      if(this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.query = this.normalizer ? this.normalizer.normalize(query) : query;
        this.suggestionsHidden = false;
        this.loadSuggestions(this.query);
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

  getSelectedOptionIds(): any[] {
    return this.selectedOptions.map((option: Option) => option.id);
  }

  isSelected(option: Option): boolean {
    return this.selectedOptions
        .filter((selectedOption: Option) => selectedOption.id === option.id)
        .length === 1
    ;
  }

  selectOption(option: Option): boolean {
    if(!this.isSelected(option)) {
      this.selectedOptions.push(option);
      this.onChange(this.getSelectedOptionIds());
      this.onSelectOption.emit(option);
    }

    this.clearQuery();

    return false;
  }

  removeOption(option: Option): boolean {
    if(this.isSelected(option)) {
      let idx: number = this.selectedOptions.indexOf(option);
      this.selectedOptions.splice(idx, 1);
      this.onChange(this.getSelectedOptionIds());
      this.onRemoveOption.emit(option);
      this.clearQuery();
    }

    return false;
  }
  
  onBlurred(): void {
    this.onTouched();
    this.focused = false;
    this.noResult = false;

    this.timeout = setTimeout(() => {
      this.suggestionsHidden = true;
      this.clearQuery();
      this.options = [];
    }, 500);
  }

  onFocused(): void {
    this.suggestionsHidden = false;
    this.focused = true;

    if(this.triggerLoadOnFocus) {
      this.loadSuggestions('');
    }
  }

  onSuggestionsMouseLeave(): void {
    if(!this.focused) {
      this.suggestionsHidden = true;
    }
  }

  protected clearQuery(): void {
    this.query = '';
  }

  protected loadSuggestions(query: string): void {
    this.options = [];

    this.service.getSuggestions(query)
      .subscribe((options: Option[]) => {
        this.loading = false;

        if(this.allowAdd) {
          let currentOption: Option = new Option({'id': this.query, 'label': this.query});

          if(!this.isSelected(currentOption)) {
            this.options.push(currentOption);
          }
        } else {
          this.noResult = options.length === 0;
        }

        options.forEach((option: Option) => {
          if(!this.isSelected(option)) {
            this.options.push(option);
          }
        });
      });
  }
}
