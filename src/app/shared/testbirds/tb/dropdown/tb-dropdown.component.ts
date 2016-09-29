import {Component, EventEmitter, OnInit} from '@angular/core';
import {Option} from '../../shared/option.model';

@Component({
  moduleId: module.id,
  selector: 'tb-dropdown',
  inputs: [
    'btnClass',
    'label',
    'options',
    'selectedOption'
  ],
  outputs: [
    'onSelect'
  ],
  template: `
    <div class="btn-group" dropdown keyboardNav="true">
      <button id="simple-btn-keyboard-nav" type="button" class="btn btn-{{ btnClass }}" dropdownToggle>
        {{ label }} <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" role="menu" aria-labelledby="simple-btn-keyboard-nav">
        <li *ngFor="let option of options" role="menuitem" [ngClass]="{'active': isSelected(option)}"><a class="dropdown-item" href="javascript:;" (click)="selectOption(option)">{{ option.label }}</a></li>
      </ul>
    </div>
  `
})
export class TestbirdsDropdownComponent implements OnInit {

  btnClass: string = 'primary';

  label: string;

  options: Option[] = [];

  selectedOption: Option;

  onSelect: EventEmitter<Option> = new EventEmitter<Option>();

  ngOnInit() {
    if(this.selectedOption) {
      this.label = this.selectedOption.label;
    }

    this.onSelect.subscribe((option: Option) => this.label = option.label);
  }

  selectOption(option: Option): void {
    this.selectedOption = option;
    this.onSelect.emit(option);
  }

  isSelected(option: Option): boolean {
    return this.selectedOption && this.selectedOption.id == option.id;
  }
}