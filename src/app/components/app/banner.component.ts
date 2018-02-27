import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent {
  @Input() heading: string;
  @Input() desc: string;
  @Input() img: string;
}
