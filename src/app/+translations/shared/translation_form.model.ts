export class TranslationFormModel {

  content: string;

  constructor(obj?: any) {
    this.content   = obj && obj.content || '';
  }
}


