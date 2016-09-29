export class ErrorModel {

  field: string;

  message: string;

  params: {[key: string]: string };

  constructor(obj?: any) {
    this.field   = obj && obj.field || '';
    this.message   = obj && obj.message || '';
    this.params   = (obj && obj.params && (obj.params instanceof Object)) ? obj.params : {};
  }
}


