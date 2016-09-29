import {Component, ElementRef, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'tb-input-debounce',
  inputs: [
    'placeholder',
    'delay',
    'header'
  ],
  outputs: ['onChange'],
  template: '<input type="text" class="form-control" [placeholder]="placeholder" [(ngModel)]="inputValue">'
})
export class TestbirdsInputDebounceComponent {

  placeholder: string;
  delay: number = 300;
  onChange: EventEmitter<any> = new EventEmitter<any>();
  inputValue: string;

  constructor(private elementRef: ElementRef) {
    let eventStream: Observable<any> = Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(() => this.inputValue)
      .debounceTime(this.delay)
      .distinctUntilChanged()
    ;

    eventStream.subscribe(input => this.onChange.emit(input));
  }

  clearInputValue(): void {
    this.inputValue = '';
  }
}