import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslationService} from './shared/translation.service';
import {TranslationIdentifierService} from './shared/translation-identifier.service';

@Component({
  moduleId: module.id,
  selector: 'tb-translations',
  templateUrl: 'translations.component.html',
  viewProviders: [TranslationIdentifierService, TranslationService],
})
export class TranslationsComponent implements OnInit {

  projectId: string;

  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
  }
}
