import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {ProjectFormModel} from '../shared/project_form.model';
import {Subscription} from 'rxjs/Rx';
import {ProjectModel} from '../shared/project.model';
import {Option} from '../../shared/testbirds/shared/option.model';
import {ErrorHandlerService} from '../../shared/testbirds/shared/error_handler.service';
import {AlertService} from '../../shared/testbirds/tb/alert/alert.service';
import {AdapterService} from '../../+adapter/shared/adapter.service';
import {Parameters} from '../../../parameters';
import {AuthService} from '../../shared/testbirds/security/auth.service';

@Component({
  moduleId: module.id,
  selector: 'tb-project-form',
  templateUrl: 'project-form.component.html',
})
export class ProjectFormComponent implements OnInit, OnDestroy {

  projectForm: FormGroup;

  projectFormModel: ProjectFormModel = new ProjectFormModel();

  projectsToInherit: Option[] = [];

  projectsToInheritSubscription: Subscription;

  project: ProjectModel;

  projectSubscription: Subscription;

  loading: boolean = true;

  submitting: boolean = false;

  imageUploadUrl: string;

  constructor(public projectService: ProjectService, public adapterService: AdapterService,
              protected authService: AuthService,
              protected errorHandlerService: ErrorHandlerService, protected alertService: AlertService,
              protected router: Router, protected route: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit() {
    this.imageUploadUrl = Parameters.MEDIA_SERVICE_API + '/images';
    this.buidForm();

    if(this.isCreateMode()) {
      this.projectsToInheritSubscription = this.projectService.getProjectsAsOptions()
        .subscribe((options: Option[]) => {
          this.projectsToInherit = options;
          this.loading = false;
        })
      ;
    } else {
      this.projectForm.removeControl('inheritedProject');

      this.projectSubscription = this.projectService.getProject(this.route.snapshot.params['projectId'])
        .subscribe(
          (project: ProjectModel) => {
            this.project = project;
            this.projectFormModel.pupulate(project);
            this.loading = false;
          },
          (error: any) => this.errorHandlerService.handleErrors(error)
        )
      ;
    }
  }

  isCreateMode(): boolean {
    return this.route.snapshot.params['mode'] === 'create';
  }

  ngOnDestroy() {
    this.isCreateMode() ?
      this.projectsToInheritSubscription.unsubscribe() : this.projectSubscription.unsubscribe();
  }

  buidForm(): void {
    this.projectForm = this.fb.group({
      'title': ['', Validators.required],
      'logo': [''],
      'inheritedProject': [''],
      'adapters': [''],
      'defaultLanguage': ['', Validators.required],
      'languages': ['', Validators.minLength(1)],
      'translationDomains': [''],
      'userPermissions': ['']
    });
  }

  onSubmit(): void {
    this.submitting = true;
    this.isCreateMode() ? this.create() : this.update();
  }

  protected create(): void {
    this.projectService.create(this.projectFormModel).subscribe(
      (project: ProjectModel) => {
        this.project = project;
        this.alertService.publish({
          'message': 'flash.project.created.success',
          'params': {'title': this.project.title}
        });

        this.router.navigate(['/projects/:projectId/info', {'projectId': project.id}]);
      },
      (error: any) => {
        this.submitting = false;
        this.errorHandlerService.handleErrors(error, this.projectForm);
      }
    );
  }

  protected update(): void {
    this.projectService.update(this.project.id, this.projectFormModel).subscribe(
      (project: ProjectModel) => {
        this.alertService.publish({'message': 'flash.project.updated.success', 'params': {'title': this.project.title}});
        this.router.navigate(['/projects/:projectId/info', {'projectId': this.project.id}]);
      },
      (error: any) => {
        this.submitting = false;
        this.errorHandlerService.handleErrors(error, this.projectForm);
      }
    );
  }

}
