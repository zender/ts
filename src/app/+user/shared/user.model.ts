export class UserModel {

  id: string;

  username: string;

  email: string;

  firstname: string;

  lastname: string;

  language: string;

  timezone: string;

  roles: string[];

  avatar: string;

  constructor(obj?: any) {
    this.id   = obj && obj._id || null;
    this.username   = obj && obj.username || null;
    this.email      = obj && obj.email || null;
    this.firstname  = obj && obj.firstname || null;
    this.lastname   = obj && obj.lastname || null;
    this.language   = obj && obj.language || null;
    this.timezone   = obj && obj.timezone || null;
    this.roles      = obj && obj.roles ? obj.roles : [];
    this.avatar     = obj && obj.avatar ? obj.avatar : '/assets/icons/profile.png';
  }

  public hasRole(role: string): boolean {
    return this.roles.indexOf(role) >= 0;
  }
}
