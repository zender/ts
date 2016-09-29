import {Component, EventEmitter} from '@angular/core';
import {TranslationDomainService} from '../shared/translation_domain.service';

@Component({
  moduleId: module.id,
  selector: 'tb-translation-domain-add-form',
  templateUrl: 'translation-domain-add-form.component.html',
  inputs: ['projectId'],
  outputs: ['onSaved'],
})

export class TranslationDomainAddFormComponent {

  projectId: string;

  onSaved: EventEmitter<string> = new EventEmitter<string>();

  value: string = '';

  constructor(protected translationDomainService: TranslationDomainService) {}

  onChange(value: string) {
    this.value = this.translationDomainService.normalize(value);
  }

  save() {
    this.onSaved.emit(this.value);
    this.value = '';
  }

  isAddButtonDisabled(): boolean {
    return this.value.length < 3;
  }
}
