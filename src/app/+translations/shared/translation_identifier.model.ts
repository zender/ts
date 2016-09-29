import {TranslationModel} from './translation.model';
import {TranslationIdentifierFormModel} from './translation_identifier_form.model';

export class TranslationIdentifierModel {

  id: string;

  name: string;

  description: string;

  translationDomain: string;

  bundle: string;

  isTranslated: boolean;

  screenshot: string;

  createdAt: Date;

  updatedAt: Date;

  translations: TranslationModel[] = [];

  constructor(obj?: any) {
    this.id   = obj && obj._id || null;
    this.name   = obj && obj.name || null;
    this.description   = obj && obj.description || null;
    this.translationDomain   = obj && obj.translationDomain || null;
    this.bundle   = obj && obj.bundle || null;
    this.screenshot   = obj && obj.screenshot || null;
    this.createdAt = obj && obj.createdAt ? new Date(obj.createdAt) : null;
    this.updatedAt = obj && obj.updatedAt ? new Date(obj.updatedAt) : null;

    if(obj && obj.translations instanceof Array) {
      obj.translations.forEach((data: any) => this.translations.push(new TranslationModel(data)));
    }
  }

  setTranslationDomain(translationDomain: string): void {
    this.translationDomain = translationDomain;
  }

  setBundle(bundle: string): void {
    this.bundle = bundle;
  }

  getFilteredTranslations(codes: string[]): TranslationModel[] {
    return this.translations.filter((translation: TranslationModel) => codes.indexOf(translation.language) > -1);
  }

  getFormData(): TranslationIdentifierFormModel {
    return new TranslationIdentifierFormModel({
      'name': this.name,
      'translationDomain': this.translationDomain,
      'bundle': this.bundle,
      'description': this.description,
      'screenshot': this.screenshot
    });
  }
}

