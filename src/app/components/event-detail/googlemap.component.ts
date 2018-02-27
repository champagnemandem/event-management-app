import { Component, OnInit, ViewChild, ElementRef, forwardRef, Input } from '@angular/core';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';


@Component({
    moduleId:module.id,
    selector: 'google-map',
    templateUrl: 'googlemap.component.html',
    providers: [ GoogleMapsAPIWrapper ]
})

export class GoogleMapComponent implements OnInit{
  // @Input('latCoord') eventDetail: string;
  @ViewChild(AgmMap) map: AgmMap;

  zoom: number = 10;
  lat: number = 42;
  lng: number = -70;
  event: Event;
  errorType: any;
  errorMsg: any;
  eventId: string;

  constructor() {
      this.reset();
  }


  ngOnInit() {
    console.log('map initalized');
      this.map.centerChange.subscribe((obj) => {
        console.log(obj.lat);
        console.log(obj.lng);
      });
  }


  reset() {
    this.zoom = this.zoom;
    this.lat = this.lat;
    this.lng = this.lng;
}

    resize(): void {
      this.map.triggerResize();
  }
}