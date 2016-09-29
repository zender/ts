import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {CORE_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {ProjectFormModel} from '../shared/project_form.model';
import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {TestbirdsTextComponent} from '../../shared/testbirds/tb-form/tb-form-text.component';
import {TestbirdsSelectComponent} from '../../shared/testbirds/tb-form/tb-form-select.component';
import {Subscription} from 'rxjs/Rx';
import {ProjectModel} from '../shared/project.model';
import {Option} from '../../shared/testbirds/shared/option.model';
import {ErrorHandlerService} from '../../shared/testbirds/shared/error_handler.service';
import {AlertService} from '../../shared/testbirds/tb/alert/alert.service';
import {AutocompleteMultiComponent} from '../../shared/testbirds/tb-form/autocomplete/autocomplete-multi.component';
import {TranslationDomainFormComponent} from '../../+translation-domain/translation-domain-form/translation-domain-form.component';
import {UserFormComponent} from '../../+user/user-form/user-form.component';
import {UserAutocompleteComponent} from '../../+user/user-autocomplete/user-autocomplete.component';
import {TranslationDomainAutocompleteComponent} from '../../+translation-domain/translation-domain-autocomplete/translation-domain-autocomplete.component';
import {LanguageAutocompleteComponent} from '../../+language/language-autocomplete/language-autocomplete.component';
import {LanguageFormComponent} from '../../+language/language-form/language-form.component';
import {AdapterService} from '../../+adapter/shared/adapter.service';
import {Parameters} from '../../../parameters';
import {TestbirdsImageUploadComponent} from '../../shared/testbirds/tb-form/image-upload/tb-image-upload.component';
import {AuthService} from '../../shared/testbirds/security/auth.service';

@Component({
  moduleId: module.id,
  selector: 'tb-project-form',
  templateUrl: 'project-form.component.html',
  directives: [
    CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, TAB_DIRECTIVES, TestbirdsTextComponent, AutocompleteMultiComponent,
    LanguageFormComponent, LanguageAutocompleteComponent, TranslationDomainFormComponent, ROUTER_DIRECTIVES,
    TranslationDomainAutocompleteComponent, UserAutocompleteComponent, UserFormComponent, TestbirdsSelectComponent,
    TestbirdsImageUploadComponent
  ],
  providers: []
})
export class ProjectFormComponent implements OnInit, OnDestroy {

  projectForm: ControlGroup;

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
