import {Component, OnInit} from '@angular/core';
import {ProjectModel} from '../shared/project.model';

@Component({
  moduleId: module.id,
  selector: 'tb-project-actions',
  templateUrl: 'project-actions.component.html',
  styleUrls: ['project-actions.component.scss'],
  inputs: ['project'],
  outputs: [],
})
export class ProjectActionsComponent implements OnInit {

  project: ProjectModel;

  routes: any[];

  constructor() {}

  ngOnInit() {
    this.routes = [
      {
        'label': 'user.management',
        'icon': 'users',
        'instructions': ['/projects/:projectId/users/management', {projectId: this.project.id}],
      },
      {
        'label': 'project.translation_id.add',
        'icon': 'translation-id',
        'instructions': ['/projects/:projectId/translation-ids/add', {projectId: this.project.id}],
      },
      {
        'label': 'project.translations',
        'icon': 'tests',
        'instructions': ['/projects/:projectId/translations', {projectId: this.project.id}],
      },
      {
        'label': 'project.info',
        'icon': 'info',
        'instructions': ['/projects/:projectId/info', {projectId: this.project.id}],
      },
      {
        'label': 'project.builds',
        'icon': 'actions',
        'instructions': ['/projects/:projectId/builds', {projectId: this.project.id}],
      },
    ];
  }
}
