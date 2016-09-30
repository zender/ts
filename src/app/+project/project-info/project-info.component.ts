import { Component, OnInit, HostBinding,
  trigger, transition, animate,
  style, state } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {ProjectModel} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';

@Component({
  moduleId: module.id,
  selector: 'tb-project-info',
  templateUrl: 'project-info.component.html',
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class ProjectInfoComponent implements OnInit {

  project: ProjectModel;

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  constructor(protected route: ActivatedRoute, protected projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params['projectId'])
      .subscribe((project: ProjectModel) => this.project = project);
  }
}
