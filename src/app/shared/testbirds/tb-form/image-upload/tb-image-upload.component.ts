import {
  Component, forwardRef, ViewChild, ElementRef, OnInit,
  ViewEncapsulation, EventEmitter
} from '@angular/core';
import {ControlValueAccessor, AbstractControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {ErrorModel} from '../../shared/error.model';
import {ImageModel} from './image.model';

export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TestbirdsImageUploadComponent),
  multi: true
};


@Component({
  moduleId: module.id,
  selector: 'tb-image-upload-form',
  templateUrl: 'image-upload.component.html',
  providers: [CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'ngFormControl',
    'url',
    'preview',
    'authToken',
    'filter',
    'initialValue'
  ],
  outputs: ['onUploaded']
})
export class TestbirdsImageUploadComponent implements ControlValueAccessor, OnInit {

  @ViewChild('uploadBtn') uploadBtn: ElementRef;

  ngFormControl: AbstractControl;

  uploader: FileUploader;

  error: ErrorModel;

  hasBaseDropZoneOver: boolean = false;

  url: string;

  authToken: string;

  disabled: boolean = false;

  onChange:any = Function.prototype;

  onTouched:any = Function.prototype;

  image: ImageModel;

  placeholderUrl: string = 'assets/jpg/placeholder.jpg'

  filter: string;

  preview: boolean = true;

  private _value: any = '';

  onUploaded: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.uploader = new FileUploader({
      url: this.url,
      authToken: this.authToken,
      autoUpload: true
    });

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      if(status === 201) {
        this.image = new ImageModel(JSON.parse(response));
        let encoded: string = btoa(response);
        this.onChange(encoded);
        this.onUploaded.emit(encoded);
      }

      this.uploader.clearQueue();
    };

    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {

      this.removeItem();

      if(status === 400) {
        let data: any = JSON.parse(response);
        this.error = new ErrorModel({'message': data.message});
      }
    };
  }

  removeItem() {
    this.uploader.clearQueue();
    this.image = null;
    this.onChange(null);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = ((item: any) => {
      this.uploadBtn.nativeElement.value = '';
      this.error = null;
    });
  }

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

  set initialValue(value: string) {
    if(value) {
      this.image = new ImageModel(JSON.parse(atob(value)));
    }
  }
}