import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tb-icon-button',
  inputs: ['icon', 'label'],
  styleUrls: ['tb-icon-button.component.scss'],
  template: `
    <tb-icon [type]="icon"></tb-icon>
    <p class="label" *ngIf="label">{{label}}</p>
  `
})
export class TestbirdsIconButtonComponent implements OnInit {
  ngOnInit() {}
}
