import {Component, OnInit, EventEmitter} from '@angular/core';
import {ProjectService} from "../shared/project.service";
import {ProjectModel} from "../shared/project.model";
import {Collection} from '../../shared/testbirds/shared/collection';

@Component({
  moduleId: module.id,
  selector: 'tb-project-list',
  templateUrl: 'project-list.component.html',
  styleUrls: ['project-list.component.scss'],
  outputs: ['projectsLoaded'],
})
export class ProjectListComponent implements OnInit {

  projectsLoaded: EventEmitter<Collection<ProjectModel>>
    = new EventEmitter<Collection<ProjectModel>>();

  projects: ProjectModel[] = [];

  totalItems: number = 0;

  itemsPerPage = 10;

  currentPage: number = 1;

  allPages: number = 0;

  constructor(protected projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects(this.currentPage);
  }

  pageChanged(event: any): void {
    this.loadProjects(event.page);
  };

  protected loadProjects(page: number = 1): void {
    this.projectService.getProjects(page).subscribe((collection: Collection<ProjectModel>) => {
      this.projects = collection.data;
      this.totalItems = collection.total;
      this.currentPage = collection.current;
      this.allPages = collection.all;
      this.projectsLoaded.emit(collection);
    });
  }
}
