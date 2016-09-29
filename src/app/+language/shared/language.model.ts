export class LanguageModel {

  name: string;

  code: string;

  flag: string;

  constructor(obj?: any) {
    this.name   = obj && obj.name || null;
    this.code   = obj && obj.code || null;
    this.flag = obj && obj.code ? '/assets/flags/%code%.png'.replace('%code%', this.code) : null;
  }
}
