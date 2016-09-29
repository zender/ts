import {Injectable} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {ErrorModel} from './error.model';
const _ = require('lodash');



@Injectable()
export class ErrorHandlerService  {

  handleErrors(response: any, form: FormGroup = null): void {
    if(response.code === 400) {
      if(response.errors instanceof Object) {
        let errors: ErrorModel[] = [];
        _.forEach(response.errors, (value: any, key: any) => {
          errors.push(new ErrorModel({'field': value.path, 'message': value.message}));
        });

        console.log(errors);
        errors.forEach((error: ErrorModel) => {
          if(form.contains(error.field)) {
            form.controls[error.field].setErrors({'serverErrors': [error]});
          }
        });
      }
    } else if(response.status === 404) {
      // handle 404
    }
  }

}
