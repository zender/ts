import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslationListComponent} from './translation-list/translation-list.component';
import {TranslationService} from './shared/translation.service';
import {ProjectRowComponent} from '../+project/project-row/project-row.component';
import {TranslationIdentifierService} from './shared/translation-identifier.service';

@Component({
  moduleId: module.id,
  selector: 'tb-translations',
  templateUrl: 'translations.component.html',
  directives: [ProjectRowComponent, TranslationListComponent],
  viewProviders: [TranslationIdentifierService, TranslationService],
})
export class TranslationsComponent implements OnInit {

  projectId: string;

  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
  }
}
