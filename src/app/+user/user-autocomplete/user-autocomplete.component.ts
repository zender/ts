import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AutocompleteMultiComponent} from '../../shared/testbirds/tb-form/autocomplete/autocomplete-multi.component';
import {Observable} from 'rxjs/Observable';
import {Option} from '../../shared/testbirds/shared/option.model';
import {AutocompleteMultiAwareInterface} from '../../shared/testbirds/tb-form/autocomplete/autocomplete_multi_aware.interface';
import {UserService} from '../shared/user.service';
import {UserModel} from '../shared/user.model';
import {ProjectUserPermissionModel} from '../shared/project_user_permission.model';
;


export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UserAutocompleteComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'tb-user-autocomplete',
  templateUrl: 'user-autocomplete.component.html',
  providers: [CONTROL_VALUE_ACCESSOR],
  inputs: [
    'service',
    'ngFormControl',
    'placeholder',
    'noResultMessage',
    'triggerLoadOnFocus',
    'showSelectedOptions',
    'allowAdd',
    'normalizer',
    'initialOptions'
  ],
  outputs: [
    'onSelectOption',
    'onRemoveOption'
  ]
})
export class UserAutocompleteComponent extends AutocompleteMultiComponent implements AutocompleteMultiAwareInterface {

  constructor(protected userService: UserService) {
    super();
    this.service = this;
  }

  addOwner(option: Option): boolean {
    option.extraData = {
      'user': option.extraData.user,
      'isOwner': true
    };
    
    return this.selectOption(option);
  }

  addUser(option: Option): boolean {
    option.extraData = {
      'user': option.extraData.user,
      'isOwner': false
    };

    return this.selectOption(option);
  }

  getSuggestions(query: string): Observable<Option[]> {

    return this.userService.findUsersByTerm(query).map((users: UserModel[]) => {
      let options: Option[] = [];

      users.forEach((user: UserModel) => {
        options.push(new Option({
          'id': user.username,
          'label': user.username,
          'extraData': {'user': user}
        }))
      });

      return options;
    });
  }

  findSelectedOptions(ids: any[]): Observable<Option[]> {
    let options: Option[] = [];

    ids.forEach((userPermission: ProjectUserPermissionModel) => {
      options.push(new Option({
        'id': userPermission.user.username,
        'label': userPermission.user.username,
        'extraData': {'user': userPermission.user, 'isOwner': userPermission.isOwner()}
      }))
    });

    return Observable.from([options]);
  }
}
