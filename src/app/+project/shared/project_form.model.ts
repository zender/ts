
import {ProjectUserPermissionModel} from '../../+user/shared/project_user_permission.model';
export class ProjectFormModel {

  title: string = '';

  description: string;

  inheritedProject: string = '';

  logo: string = '';

  defaultLanguage: string = '';

  languages: string[] = [];

  enabled: boolean = false;
  
  userPermissions: ProjectUserPermissionModel[] = [];

  translationDomains: string[] = [];

  adapters: string[] = [];

  constructor(obj?: any) {
    this.pupulate(obj);
  }

  pupulate(obj?: any) {
    this.title = obj && obj.title || '';
    this.description = obj && obj.description || '';
    this.inheritedProject = obj && obj.inheritedProject || '';
    this.logo = obj && obj.logo || '';
    this.defaultLanguage = obj && obj.defaultLanguage || '';
    this.enabled = obj && obj.enabled ? <boolean>obj.enabled : false;

    if(obj && obj.adapters instanceof Array) {
      obj.adapters.forEach((data: string) => this.adapters.push(data));
    }

    if(obj && obj.languages instanceof Array) {
      obj.languages.forEach((data: string) => this.languages.push(data));
    }

    if(obj && obj.translationDomains instanceof Array) {
      obj.translationDomains.forEach((data: string) => this.translationDomains.push(data));
    }
    
    if(obj && obj.userPermissions instanceof Array) {
      obj.userPermissions.forEach((data: any) => this.userPermissions.push(new ProjectUserPermissionModel(data)));
    }
  }
}
