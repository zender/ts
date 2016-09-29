import {UserModel} from "./user.model";

export class ProjectUserPermissionModel {

  user: UserModel = null;

  isAllowedToAddTranslationId: boolean;

  isAllowedToAddTranslationDomain: boolean;

  createdAt: Date;

  constructor(obj?: any) {
    if(obj && obj.user) {
      this.user = obj.user instanceof UserModel ? obj.user : new UserModel(obj.user);
    }

    this.isAllowedToAddTranslationId = <boolean>obj.isAllowedToAddTranslationId;
    this.isAllowedToAddTranslationDomain = <boolean>obj.isAllowedToAddTranslation;
    this.createdAt = obj && obj.createdAt ? new Date(obj.createdAt) : null;
  }

  isOwner(): boolean {
    return this.isAllowedToAddTranslationId && this.isAllowedToAddTranslationDomain;
  }

  enableOwnerRights() {
    this.isAllowedToAddTranslationId = true;
    this.isAllowedToAddTranslationDomain = true;
  }

  disableOwnerRights() {
    this.isAllowedToAddTranslationId = false;
    this.isAllowedToAddTranslationDomain = false;
  }

  get permissions() {
    return {
      'isAllowedToAddTranslationId': this.isAllowedToAddTranslationId,
      'isAllowedToAddTranslationDomain': this.isAllowedToAddTranslationDomain
    }
  }
}
