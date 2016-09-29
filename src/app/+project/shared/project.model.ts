
import {UserModel} from '../../+user/shared/user.model';
import {ProjectUserPermissionModel} from '../../+user/shared/project_user_permission.model';
import {ProjectStatsModel} from './project_stats.model';

export class ProjectModel {

  id: string;

  title: string;

  description: string;

  inheritedProject: string;

  logo: string;

  defaultLanguage: string;

  languages: string[] = [];

  enabled: boolean;

  owner: UserModel;

  userPermissions: ProjectUserPermissionModel[] = [];

  translationDomains: string[] = [];

  adapters: string[] = [];

  stats: ProjectStatsModel;

  constructor(obj?: any) {
    this.id = obj && obj._id || null;
    this.title = obj && obj.title || null;
    this.description = obj && obj.description || null;
    this.inheritedProject = obj && obj.inheritedProject || null;
    this.logo = obj && obj.logo || null;
    this.defaultLanguage = obj && obj.defaultLanguage || null;
    this.enabled = obj && obj.enabled ? <boolean>obj.enabled : false;
    this.owner = obj && obj.owner ? new UserModel(obj.owner): null;
    this.stats = obj && obj.stats ? new ProjectStatsModel(obj.stats): null;

    if(obj && obj.languages instanceof Array) {
      obj.languages.forEach((data: string) => this.languages.push(data));
    }

    if(obj && obj.translationDomains instanceof Array) {
      obj.translationDomains.forEach((data: string) => this.translationDomains.push(data));
    }

    if(obj && obj.adapters instanceof Array) {
      obj.adapters.forEach((data: string) => this.adapters.push(data));
    }

    if(obj && obj.userPermissions instanceof Array) {
      obj.userPermissions.forEach((data: any) => this.userPermissions.push(new ProjectUserPermissionModel(data)));
    }

  }
}
