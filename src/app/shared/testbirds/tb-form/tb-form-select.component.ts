import {Component, forwardRef, EventEmitter} from '@angular/core';
import {ControlValueAccessor, AbstractControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Option} from '../shared/option.model';

export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TestbirdsSelectComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'tb-select-form',
  providers: [CONTROL_VALUE_ACCESSOR],
  inputs: [
    'ngFormControl',
    'options',
    'placeholder'
  ],
  outputs: [
    'onSelect'
  ],
  template: `
    <div class="form-group" [class.has-error]="ngFormControl && !ngFormControl.valid && ngFormControl.touched">
        <select #selectElement class="form-control" (change)="selectValue(selectElement.value)" (click)="onTouched()">
          <option *ngIf="placeholder" value="">{{ placeholder }}</option>
          <option *ngFor="let option of options" [value]="option.id" [selected]="isSelected(option)">{{ option.label }}</option>
        </select>

        <span class="highlight"></span><span class="bar"></span>
        
        <ul *ngIf="ngFormControl && ngFormControl.errors && ngFormControl.errors.serverErrors">
            <li *ngFor="let error of ngFormControl.errors.serverErrors">{{ error.message }}</li>
        </ul>
    </div>
  `
})
export class TestbirdsSelectComponent implements ControlValueAccessor {

  ngFormControl: AbstractControl;

  options: Option[] = [];

  placeholder: string = null;

  onSelect: EventEmitter<any> = new EventEmitter<any>();
  
  disabled: boolean = false;

  onChange:any = Function.prototype;

  onTouched:any = Function.prototype;

  private _value: any = '';

  private selectedOption: Option = null;

  get value(): any { return this._value; };

  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
  
  selectValue(value: any): void {
    let option: Option = this.getOption(value);
    this.onChange(option !== null ? option.id : '');
    this.selectedOption = option;
    this.onSelect.emit(option);
  }

  isSelected(option: Option): boolean {
    return this.selectedOption && this.selectedOption.id == option.id;
  }

  protected getOption(id: any): Option {
    let filtered: Option[] = this.options
      .filter((option: Option) => option.id == id)
    ;

    return filtered.length === 1 ? filtered.pop() : null;
  }
}