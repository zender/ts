import {Component, OnInit} from '@angular/core';
import {LanguageModel} from '../+language/shared/language.model';
import {AdapterModel} from '../+adapter/shared/adapter.model';
import {LanguageService} from '../+language/shared/language.service';
import {AdapterService} from '../+adapter/shared/adapter.service';
import {ProjectModel} from '../+project/shared/project.model';
import {AuthService} from '../shared/testbirds/security/auth.service';
import {Collection} from '../shared/testbirds/shared/collection';

@Component({
  moduleId: module.id,
  selector: 'tb-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  languages: LanguageModel[] = [];

  adapters: AdapterModel[] = [];

  hasProjects: boolean = false;

  isAdmin: boolean = false;

  rowClass: string = 'col-sm-12';

  constructor(protected languageService: LanguageService, protected adapterService: AdapterService,
              protected authService: AuthService) {}

  ngOnInit() {
    this.languageService.getLanguagesAsObservable().subscribe((languages: LanguageModel[]) => this.languages = languages);
    this.adapterService.getAdapters().subscribe((adapters: AdapterModel[]) => this.adapters = adapters);


    if(this.authService.hasRole('ADMIN')) {
      this.isAdmin = true;
      this.rowClass = 'col-sm-9';
    }
  }

  onProjectsLoaded(collection: Collection<ProjectModel>): void {
    this.hasProjects = collection.total > 0;
  }
}
