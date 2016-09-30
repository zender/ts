import {Component, EventEmitter} from '@angular/core';
import {TranslationService} from '../shared/translation.service';
import {ErrorHandlerService} from '../../shared/testbirds/shared/error_handler.service';
import {TranslationModel} from '../shared/translation.model';
import {ProjectService} from '../../+project/shared/project.service';

@Component({
  moduleId: module.id,
  selector: 'tb-translation-content',
  templateUrl: 'translation-content.component.html',
  inputs: ['projectId', 'translationIdentifierId', 'translation'],
  outputs: ['onUpdate'],
})
export class TranslationContentComponent {

  projectId: string;

  translationIdentifierId: string;

  translation: TranslationModel;

  onUpdate: EventEmitter<TranslationModel> = new EventEmitter<TranslationModel>();

  isBtnEnabled: boolean = false;

  submitting: boolean = false;

  constructor(protected translationService: TranslationService, protected errorHandlerService: ErrorHandlerService,
  protected projectService: ProjectService) {}

  update(): void {
    this.submitting = true;
    this.translationService
      .patchAndGet(this.projectId, this.translationIdentifierId, this.translation.language, {'content': this.translation.content})
      .subscribe(
        (data: any) => {
          this.translation.populate(data);
          this.isBtnEnabled = false;
          this.submitting = false;
          this.onUpdate.emit(this.translation);
          this.projectService.triggerUpdate(this.projectId);
        }
      ),
      (errors: any) => this.errorHandlerService.handleErrors(errors)
    ;
  }
}
