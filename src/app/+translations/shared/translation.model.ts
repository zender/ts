export class TranslationModel {

  language: string;

  content: string;

  isTranslated: boolean;

  constructor(obj?: any) {
    this.populate(obj);
  }

  populate(obj?: any) {
    this.language   = obj && obj.language || '';
    this.content   = obj && obj.content || '';
    this.isTranslated = obj && obj.isTranslated ? <boolean>obj.isTranslated : false;
  }
}



