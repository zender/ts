import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tb-icon',
  inputs: ['type'],
  outputs: ['onSelect'],
  template: `
    <i class="tb-icon" [ngClass]="iconType"></i>
  `
})
export class TestbirdsIconComponent implements OnInit {
  type:string = 'default';

  private iconType:string;

  ngOnInit() {
    this.iconType = `icon-${this.type}`;
  }
}
