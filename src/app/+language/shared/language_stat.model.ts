export class LanguageStatModel {

  languageCode: string;

  completeness: number;

  numberOfTranslations: number

  constructor(obj?: any) {
    this.languageCode   = obj && obj.languageCode || null;
    this.completeness   = obj && obj.completeness || 0.0;
    this.numberOfTranslations   = obj && obj.numberOfTranslations || 0;
  }

}
