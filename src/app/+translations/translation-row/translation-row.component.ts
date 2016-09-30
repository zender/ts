import {Component, OnInit} from '@angular/core';
import {TranslationIdentifierModel} from '../shared/translation_identifier.model';
import {LanguageModel} from '../../+language/shared/language.model';
import {Parameters} from '../../../parameters';
import {AuthService} from '../../shared/testbirds/security/auth.service';

@Component({
  moduleId: module.id,
  selector: 'tb-translation-row',
  templateUrl: 'translation-row.component.html',
  inputs: ['projectId', 'translationIdentifier', 'languages', 'languageCodes'],
  outputs: [],
})
export class TranslationRowComponent implements OnInit {

  projectId: string;

  translationIdentifier: TranslationIdentifierModel;

  languageCodes: string[] = [];

  languages: LanguageModel[] = [];

  imageUploadUrl: string;

  constructor(protected authService: AuthService) {}

  ngOnInit() {
    this.imageUploadUrl = Parameters.MEDIA_SERVICE_API + '/images';
  }

  getLanguage(code: string): LanguageModel {
    return this.languages.find((language: LanguageModel) => language.code === code);
  }
}
