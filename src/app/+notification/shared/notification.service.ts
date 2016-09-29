import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {NotificationModel} from './notification.model';
import {Collection} from '../../shared/testbirds/shared/collection';
import {BackendService} from '../../shared/services/backend.service';

@Injectable()
export class NotificationService {

  protected resource: any;

  constructor(protected service: BackendService) {
    this.resource = service.getResource('notifications');
  }

  getNotifications(page: number = 1): Observable<Collection<NotificationModel>> {

    let skip: number = page - 1;
    let promise: Promise<any> = this.resource.find({
      '$skip': skip
    });

    return  Observable.fromPromise(promise)
      .map((data: any) => {
        return new Collection<NotificationModel>(data, (item: any): NotificationModel => new NotificationModel(item));
      })
    ;
  }
}
