export class ImageModel {

  filename: string;

  originalname: string;

  extension: string;

  mimetype: string;

  size: number;

  createdAt: Date;

  links: ImageLinksModel;

  constructor(obj?: any) {
    this.filename   = obj && obj.filename || null;
    this.originalname   = obj && obj.originalname || null;
    this.extension   = obj && obj.extension || null;
    this.mimetype   = obj && obj.mimetype || null;
    this.size   = obj && obj.size || 0;
    this.createdAt = obj && obj.createdAt ? new Date(obj.createdAt) : null;

    if(obj && obj.links) {
      this.links = new ImageLinksModel(obj.links);
    }
  }
}


class ImageLinksModel {

  render: string;

  download: string ;

  constructor(obj?: any) {
    this.render   = obj && obj.render || null;
    this.download   = obj && obj.download || null;
  }
}


