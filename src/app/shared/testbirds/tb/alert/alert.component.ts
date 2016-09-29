import {Component, OnInit, OnDestroy} from '@angular/core';
import {AlertService} from './alert.service';
import {AlertModel} from './alert.model';
import {Subscription} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'tb-alert',
  templateUrl: 'alert.component.html',
})
export class TestbirdsAlertComponent implements OnInit, OnDestroy {

  alerts: AlertModel[] = [];

  alertSubscription: Subscription;

  constructor(protected service: AlertService) {}

  ngOnInit() {
    this.alertSubscription = this.service.onAlert.subscribe((alert: AlertModel) => this.alerts.push(alert));
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  removeAlert(alert: AlertModel): void {
    let idx: number = this.alerts.indexOf(alert);
    this.alerts.splice(idx, 1);
  }
}
