import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tb-panel',
  templateUrl: 'tb-panel.component.html',
  styleUrls: ['tb-panel.component.scss'],
  inputs: [
    'type',
    'title',
    'header'
  ],
  outputs: [],
})
export class TestbirdsPanelComponent implements OnInit {
  type: string = 'default';
  title: string;
  header: boolean = true;

  private panelType: string;

  ngOnInit() {
    this.panelType = `tb-panel-${this.type}`;
  }
}

@Component({
  moduleId: module.id,
  selector: 'tb-panel-wrapper',
  styleUrls: ['tb-panel.component.scss'],
  inputs: [
    'type'
  ],
  outputs: [],
  template: `
  <div class="tb-panel" [ngClass]="panelType">
    <ng-content></ng-content>
  </div>
  `
})
export class TestbirdsPanelWrapperComponent implements OnInit {
  type: string = 'default';

  private panelType: string;

  ngOnInit() {
    this.panelType = `tb-panel-${this.type}`;
  }
}

@Component({
  moduleId: module.id,
  selector: 'tb-panel-header',
  directives: [],
  template: `
  <div class="tb-panel-head">
    <ng-content></ng-content>
  </div>
  `
})
export class TestbirdsPanelHeaderComponent {}

@Component({
  moduleId: module.id,
  selector: 'tb-panel-body',
  template: `
  <div class="tb-panel-body">
    <ng-content></ng-content>
  </div>
  `
})
export class TestbirdsPanelBodyComponent {}
