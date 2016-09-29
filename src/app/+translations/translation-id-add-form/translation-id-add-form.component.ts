import {Component, OnInit, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {AlertService} from '../../shared/testbirds/tb/alert/alert.service';
import {ErrorHandlerService} from '../../shared/testbirds/shared/error_handler.service';
import {AutocompleteComponent} from '../../shared/testbirds/tb-form/autocomplete/autocomplete.component';
import {TestbirdsTextComponent} from '../../shared/testbirds/tb-form/tb-form-text.component';
import {TranslationIdentifierModel} from '../shared/translation_identifier.model';
import {TranslationIdentifierFormModel} from '../shared/translation_identifier_form.model';
import {TranslationDomainService} from '../../+translation-domain/shared/translation_domain.service';
import {TranslationIdentifierService} from '../shared/translation-identifier.service';

@Component({
  moduleId: module.id,
  selector: 'tb-translation-id-add-form',
  templateUrl: 'translation-id-add-form.component.html',
  directives: [
    AutocompleteComponent, TestbirdsTextComponent, CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES
  ],
  providers: [],
  inputs: ['projectId'],
  outputs: ['onCreated'],
})
export class TranslationIdAddFormComponent implements OnInit {

  projectId: string;

  onCreated: EventEmitter<TranslationIdentifierModel> = new EventEmitter<TranslationIdentifierModel>();

  model: TranslationIdentifierFormModel = new TranslationIdentifierFormModel();

  form: ControlGroup;

  submitting: boolean = false;

  constructor(protected translationIdentifierService: TranslationIdentifierService, protected fb: FormBuilder,
              protected translationDomainService: TranslationDomainService,
              protected alertService: AlertService, protected errorHandlerService: ErrorHandlerService) {}


  ngOnInit() {
    this.buidForm();
  }

  normalizeIdentifier(): void {
    this.model.name = this.translationIdentifierService.normalize(this.model.name);
  }

  onSubmit() {
    this.submitting = true;
    this.translationIdentifierService
      .create(this.projectId, this.model)
      .subscribe(
        (data: TranslationIdentifierModel) => {
          this.onCreated.emit(data);
          this.alertService.publish({
            'message': 'flash.translationIdentifier.created',
            'params': {'name': data.name}
          });

          this.buidForm();
          this.submitting = false;
        },
        (errors: any) => {
          this.errorHandlerService.handleErrors(errors, this.form);
          this.submitting = false;
        }
      )
    ;
  }

  buidForm(): void {
    this.form = this.fb.group({
      'name': ['', Validators.required],
      'translationDomain': ['', Validators.required],
      'bundle': ['', Validators.required],
    });
  }
}
