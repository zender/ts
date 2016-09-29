import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, AbstractControl, NG_VALUE_ACCESSOR} from '@angular/forms';


export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TestbirdsTextareaComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'tb-textarea-form',
  template: `
    <div class="form-group" [class.has-error]="ngFormControl && !ngFormControl.valid && ngFormControl.touched">
        <textarea
            class="form-control"
            placeholder="{{ placeholder }}"
            [(ngModel)]="value"
            (blur)="onTouched()"
        >{{ value }}</textarea>

        <span class="highlight"></span><span class="bar"></span>
        
        <ul *ngIf="ngFormControl && ngFormControl.errors && ngFormControl.errors.serverErrors">
            <li *ngFor="let error of ngFormControl.errors.serverErrors">{{ error.message }}</li>
        </ul>
    </div>
  `,
  providers: [CONTROL_VALUE_ACCESSOR],
  inputs: [
    'ngFormControl',
    'placeholder'
  ],
  outputs: [],
})
export class TestbirdsTextareaComponent implements ControlValueAccessor {

  ngFormControl: AbstractControl;

  placeholder: string = null;

  private _value: any = '';

  onChange:any = Function.prototype;

  onTouched:any = Function.prototype;

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

}
