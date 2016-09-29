import { Injectable } from '@angular/core';
import {Parameters} from '../../../parameters';
import {AuthService} from '../testbirds/security/auth.service';
import {UserModel} from '../../+user/shared/user.model';
const superagent = require('superagent');

declare const io;
declare const feathers;

@Injectable()
export class BackendService {

  private _app: any;

  constructor(private authService: AuthService) {
    switch(Parameters.TRANSLATION_SERVICE_PROVIDER) {
      case 'rest':
          this.initRest();
        break;
      case 'socketio':
          this.initSocketIO();
        break;
      default:
        throw new Error(`Invalid provider ${Parameters.TRANSLATION_SERVICE_PROVIDER}`);
    }
  }

  protected initSocketIO() {
    var authService: AuthService = this.authService;
    var socket: any = io(Parameters.TRANSLATION_SERVICE_API_REAL, {
      transports: ['websocket']
    });

    this._app =  feathers()
      .configure(feathers.hooks())
      .configure(feathers.socketio(socket))
    ;

    this._app.mixins.push(function(service) {
      service.before((hook) => {
        hook.params.query = {
          '_token': authService.getToken()
        };

        return hook;
      });
    });
  }

  protected initRest() {
    this._app = feathers()
      .configure(feathers.hooks())
      .configure(feathers.rest(Parameters.TRANSLATION_SERVICE_API_REAL).superagent(superagent))
      .configure(feathers.authentication({ storage: localStorage }))
    ;

    this.authService.getUserObservable().subscribe((user: UserModel) => {
      this._app.set('token', this.authService.getToken());
    });
  }

  getResource(service: string): any {
    return this._app.service(service);
  }
}