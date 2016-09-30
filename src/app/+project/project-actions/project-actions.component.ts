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
        'instructions': ['/users-management', this.project.id],
      },
      {
        'label': 'project.translation_id.add',
        'icon': 'translation-id',
        'instructions': ['/translation-id-add', this.project.id],
      },
      {
        'label': 'project.translations',
        'icon': 'tests',
        'instructions': ['/translations', this.project.id],
      },
      {
        'label': 'project.info',
        'icon': 'info',
        'instructions': ['/project-info', this.project.id],
      },
      {
        'label': 'project.builds',
        'icon': 'actions',
        'instructions': ['/project-builds', this.project.id],
      },
    ];
  }
}
