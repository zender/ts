import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {ProjectModel} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';

@Component({
  moduleId: module.id,
  selector: 'tb-project-row',
  templateUrl: 'project-row.component.html',
  styleUrls: ['project-row.component.scss'],
  inputs: ['project'],
})
export class ProjectRowComponent implements OnInit, OnDestroy {

  project: ProjectModel;

  projectUpdatedSubscription: Subscription;

  constructor(protected projectService: ProjectService, protected router: Router, protected route: ActivatedRoute) {}

  ngOnInit() {
    if(!this.project) {
      this.loadProject(this.route.snapshot.params['projectId']);
    }

    this.projectUpdatedSubscription = this.projectService.onProjectChange().subscribe((projectId: string) => {
      if(this.project.id === projectId) {
       this.loadProject(projectId);
      }
    });
  }

  ngOnDestroy() {
    this.projectUpdatedSubscription.unsubscribe();
  }

  loadProject(projectId: string): void {
    this.projectService
      .getProject(this.route.snapshot.params['projectId'])
      .subscribe((project: ProjectModel) => this.project = project)
    ;
  }

  toggleEnable(): void {
    let toggled: boolean = !this.project.enabled;
    this.projectService
      .toggleEnableProject(this.project.id, this.project.enabled)
      .subscribe((data: any) => {
        this.project.enabled = toggled;
      })
    ;
  }
}
