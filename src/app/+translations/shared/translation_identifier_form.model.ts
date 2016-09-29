export class TranslationIdentifierFormModel {

  name: string;

  translationDomain: string;

  bundle: string;

  description?: string;

  screenshot?: string;

  constructor(obj?: any) {
    this.name   = obj && obj.name || null;
    this.translationDomain   = obj && obj.translationDomain || null;
    this.bundle   = obj && obj.bundle || null;
    this.description   = obj && obj.description || null;
    this.screenshot   = obj && obj.screenshot || null;
  }

  resetValues(): void {
    this.name   = null;
    this.translationDomain  = null;
    this.bundle  = null;
  }
}

