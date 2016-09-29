import {Directive, ElementRef, Input, HostListener} from '@angular/core';

declare const jQuery: any;

require('jquery-colorbox');

@Directive({
  selector: '[tsColorbox]',
})
export class TestbirdsColorboxDirective {

  @Input() options: any = {'photo': true};

  constructor(protected el: ElementRef) {}

  @HostListener('click') onClick() {
    jQuery(this.el.nativeElement).colorbox(this.options);
  }
}