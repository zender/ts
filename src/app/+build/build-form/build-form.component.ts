import {Component, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BuildModel} from '../shared/build.model';
import {BuildService} from '../shared/build.service';
import {ErrorHandlerService} from '../../shared/testbirds/shared/error_handler.service';
import {AlertService} from '../../shared/testbirds/tb/alert/alert.service';

@Component({
  moduleId: module.id,
  selector: 'tb-build-form',
  template: `
    <form [formGroup]="form" (submit)="onSubmit()" class="form">
      <tb-text-form
          [placeholder]="'Enter name'"
          [ngFormControl]="form.controls['name']"
          [(ngModel)]="name"
          formControlName="name"
      ></tb-text-form>
      
      <button [disabled]="!form.valid || submitting" class="btn btn-primary">Build</button>
    </form>
  `,
  inputs: ['projectId'],
  outputs: ['onCreate'],
})
export class BuildFormComponent implements OnInit {

  projectId: string;

  onCreate: EventEmitter<BuildModel> = new EventEmitter<BuildModel>();

  form: FormGroup;

  name: string;

  submitting: boolean = false;

  constructor(protected buildService: BuildService, protected errorHandlerService: ErrorHandlerService,
              protected alertService: AlertService, protected fb: FormBuilder) {}

  ngOnInit() {
    this.buidForm();
  }

  buidForm(): void {
    this.form = this.fb.group({
      'name': ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitting = true;
    this.buildService.create(this.projectId, {'name': this.name})
      .subscribe(
        (build: BuildModel) => {
          this.form.reset();
          this.submitting = false;
          this.onCreate.emit(build);
          this.alertService.publish({
            'message': 'flash.build.created',
            'params': {'%name%': build.name}
          });
        },
        (errors: any) => {
          this.errorHandlerService.handleErrors(errors, this.form);
          this.submitting = false;
        }
      )
    ;
  }
}
