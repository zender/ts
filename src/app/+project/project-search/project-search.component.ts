import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {AutocompleteAwareInterface} from '../../shared/testbirds/tb-form/autocomplete/autocomplete_aware.interface';
import {AutocompleteComponent} from '../../shared/testbirds/tb-form/autocomplete/autocomplete.component';
import {Observable} from 'rxjs/Rx';
import {Option} from '../../shared/testbirds/shared/option.model';
import {ProjectService} from '../shared/project.service';


@Component({
  moduleId: module.id,
  selector: 'tb-project-search',
  templateUrl: 'project-search.component.html',
  directives: [CORE_DIRECTIVES],
  inputs: [
    'service',
    'ngFormControl',
    'placeholder',
    'noResultMessage',
    'initialOption'
  ],
  outputs: [
    'onSelectOption',
    'onRemoveOption'
  ],
})
export class ProjectSearchComponent extends AutocompleteComponent implements  OnInit, AutocompleteAwareInterface {

  projectId: string;

  constructor(protected projectService: ProjectService, protected router: Router, protected route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.service = this;
    this.projectId = this.route.snapshot.params['projectId'];
  }

  getSuggestions(query: string): Observable<Option[]> {
    return this.projectService
      .getProjectsAsOptions(query, false)
      .map((options: Option[]) => {
        return options.filter((option: Option) => option.id !== this.projectId);
      })
    ;
  }

  findSelectedOption(id: any): Observable<Option> {
    return Observable.from([]);
  }

  selectOption(option: Option): boolean {
    this.router.navigate(['/projects/:projectId/info', {'projectId': option.id}]);

    return false;
  }
}
