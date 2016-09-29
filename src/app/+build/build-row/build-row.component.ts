import {Component, EventEmitter} from '@angular/core';
import {ErrorHandlerService} from '../../shared/testbirds/shared/error_handler.service';
import {AlertService} from '../../shared/testbirds/tb/alert/alert.service';
import {BuildModel} from '../shared/build.model';
import {BuildService} from '../shared/build.service';

@Component({
  moduleId: module.id,
  selector: 'tb-build-row',
  templateUrl: 'build-row.component.html',
  inputs: ['projectId', 'build'],
  outputs: ['onRemove'],
})
export class BuildRowComponent {

  projectId: string;

  build: BuildModel;

  onRemove: EventEmitter<BuildModel> = new EventEmitter<BuildModel>();

  constructor(protected buildService: BuildService, protected errorHandlerService: ErrorHandlerService,
              protected alertService: AlertService) {}

  remove(build: BuildModel): void {
    this.buildService.remove(this.projectId, build.id)
      .subscribe(
        () => {
          this.onRemove.emit(build);
          this.alertService.publish({
            'message': 'flash.build.deleted',
            'params': {'%name%': build.name}
          });
        },
        (errors: any) => this.errorHandlerService.handleErrors(errors)
      )
    ;
  }
}
