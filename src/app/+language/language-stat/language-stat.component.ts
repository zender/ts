import {Component, OnInit} from '@angular/core';
import {LanguageStatModel} from "../shared/language_stat.model";
import {LanguageService} from "../shared/language.service";
import {LanguageModel} from "../shared/language.model";

@Component({
  moduleId: module.id,
  selector: 'tb-language-stat',
  templateUrl: 'language-stat.component.html',
  inputs: ['languageStat'],
  outputs: [],
})
export class LanguageStatComponent implements OnInit {

  languageStat: LanguageStatModel;

  language: LanguageModel;

  constructor(protected languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.getLanguageAsObservable(this.languageStat.languageCode)
      .subscribe((language: LanguageModel) => this.language = language)
    ;
  }
}
