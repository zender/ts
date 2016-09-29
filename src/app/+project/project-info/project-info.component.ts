import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectRowComponent} from '../project-row/project-row.component';
import {ProjectModel} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';

@Component({
  moduleId: module.id,
  selector: 'tb-project-info',
  templateUrl: 'project-info.component.html',
  directives: [ProjectRowComponent]
})
export class ProjectInfoComponent implements OnInit {

  project: ProjectModel;

  constructor(protected route: ActivatedRoute, protected projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params['projectId'])
      .subscribe((project: ProjectModel) => this.project = project);
  }
}
