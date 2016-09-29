export class NotificationModel {

  id: string;

  title: string;

  content: string;

  createdAt: Date;

  action: string;

  context: {[key: string]: any } = {};

  icon: string;

  constructor(obj?: any) {
    this.id = obj && obj._id || null;
    this.title = obj && obj.title || null;
    this.content = obj && obj.content || null;
    this.createdAt = obj && obj.createdAt ? new Date(obj.createdAt) : null;
    this.action = obj && obj.action || null;
    this.context = obj && obj.context || {};
    this.icon = obj && obj.action ? '/assets/icons/%action%.png'.replace('%action%', this.action) : null;
  }
}
