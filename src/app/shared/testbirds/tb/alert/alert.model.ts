import {AlertEnum} from './alert.enum';

export class AlertModel {
  type: AlertEnum;
  message: string = '';
  params: {[key: string]: string } = {};
  dismissible: boolean = true;

  constructor(obj?: any) {
    this.type   = obj && obj.type || AlertEnum.SUCCESS;
    this.message   = obj && obj.message || '';
    this.params   = obj && obj.params || {};
    this.dismissible = obj && obj.dismissible ? <boolean>obj.dismissible : true;
  }

  getViewType(): string {
    return AlertEnum[this.type].toLowerCase();
  }
}