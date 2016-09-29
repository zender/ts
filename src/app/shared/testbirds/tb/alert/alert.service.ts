import {Injectable} from '@angular/core';
import {AlertModel} from './alert.model';
import {ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class AlertService {
  
  onAlert: ReplaySubject<AlertModel> = new ReplaySubject<AlertModel>();

  publish(obj?: any): void {
    let alert = new AlertModel(obj);
    this.onAlert.next(alert)
  }
}