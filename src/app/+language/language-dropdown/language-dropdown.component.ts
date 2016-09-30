import {Component} from '@angular/core';
import {TestbirdsDropdownComponent} from '../../shared/testbirds/tb/dropdown/tb-dropdown.component';

@Component({
  moduleId: module.id,
  selector: 'language-dropdown',
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
        <li *ngFor="let option of options" role="menuitem" [ngClass]="{'active': isSelected(option)}">
          <a class="dropdown-item" href="javascript:;" (click)="selectOption(option)">
          <span *ngIf="!option.extraData">{{ option.label }}</span>
          <span *ngIf="option.extraData">
            <img [src]="option.extraData.language.flag" /> 
            {{ option.label }} {{ option.extraData.languageStats.completeness }}%
          </span>
     
          </a>
        </li>
      </ul>
    </div>
  `
})
export class LanguageDropdownComponent extends TestbirdsDropdownComponent {}