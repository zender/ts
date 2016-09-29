
import {UserModel} from '../../+user/shared/user.model';

export class BuildModel {

  id: string;

  name: string;

  state: string;

  createdBy: UserModel;

  builtAt: Date;

  sources: SourceModel[] = [];

  constructor(obj?: any) {
    this.id   = obj && obj._id || null;
    this.name   = obj && obj.name || null;
    this.state   = obj && obj.state || null;
    this.builtAt = obj && obj.builtAt ? new Date(obj.builtAt) : null;
    this.createdBy = obj && obj.createdBy ? new UserModel(obj.createdBy) : null;

    if(obj && obj.sources instanceof Array) {
      obj.sources.forEach((data: any) => this.sources.push(new SourceModel(data)));
    }
  }
}

class SourceModel {

  adapter: string;

  url: string;

  constructor(obj?: any) {
    this.adapter   = obj && obj.adapter || null;
    this.url   = obj && obj.url || null;
  }
}
