import {Component} from '@angular/core';
import {ImageModel} from '../../shared/testbirds/tb-form/image-upload/image.model';

@Component({
  moduleId: module.id,
  selector: 'tb-project-logo',
  template: `
    <div class="logo">
        <tb-icon type="bird" *ngIf="!image"></tb-icon>
        
        <a *ngIf="image" tsColorbox [href]="image.links.render">
            <img  [src]="image.links.render|tsImageFilter: filter">
        </a>
    </div>
  `,
  inputs: [
    'logo', 'filter'
  ]
})
export class ProjectLogoComponent {

  image: ImageModel;

  filter: string;

  set logo(logo: string) {
    if(logo) {
      this.image = new ImageModel(JSON.parse(atob(logo)));
    }
  }
}
