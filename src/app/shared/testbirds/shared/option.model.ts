export class Option {
  id: any;
  label: string;
  extraData: any;

  constructor(obj?: any) {
    this.id   = obj && obj.id || null;
    this.label   = obj && obj.label || null;
    this.extraData = obj && obj.extraData || null;
  }
}