import {Component, forwardRef} from '@angular/core';
import {Option} from '../../shared/testbirds/shared/option.model';
import {AutocompleteMultiComponent} from '../../shared/testbirds/tb-form/autocomplete/autocomplete-multi.component';
import {CORE_DIRECTIVES, AbstractControl} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ProjectUserPermissionModel} from '../shared/project_user_permission.model';

export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UserFormComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'tb-user-form',
  templateUrl: 'user-form.component.html',
  providers: [CONTROL_VALUE_ACCESSOR],
  directives: [CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  inputs: ['autocompleteWidget', 'ngFormControl'],
})
export class UserFormComponent implements ControlValueAccessor {

  autocompleteWidget: AutocompleteMultiComponent;

  ngFormControl: AbstractControl;

  value: any;

  onChange:any = Function.prototype;

  onTouched:any = Function.prototype;

  userPermissions: ProjectUserPermissionModel[] = [];

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  addPermission(option: Option): void {
    option.extraData.isOwner ? this.addOwner(option) : this.addUser(option);
  }
  
  removePermission(userPermission: ProjectUserPermissionModel): boolean {
    this.autocompleteWidget.removeOption(new Option({
      'id'   : userPermission.user.username,
      'label': userPermission.user.username,
    }));

    let idx: number = this.userPermissions.indexOf(userPermission);
    this.userPermissions.splice(idx, 1);
    this.onChange(this.userPermissions);

    return false;
  }

  protected addOwner(option: Option): void {
    this.userPermissions.push(new ProjectUserPermissionModel({
      'user': option.extraData.user,
      'isAllowedToAddTranslationId': true,
      'isAllowedToAddTranslation': true,
    }));

    this.onChange(this.userPermissions);
  }

  protected addUser(option: Option): void {
    this.userPermissions.push(new ProjectUserPermissionModel({
      'user': option.extraData.user,
      'isAllowedToAddTranslationId': false,
      'isAllowedToAddTranslation': false,
    }));

    this.onChange(this.userPermissions);
  }
}
