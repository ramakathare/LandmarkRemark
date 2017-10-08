import { Component, AfterViewInit, PLATFORM_ID} from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../config';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'map-bg',
    templateUrl: './mapbg.component.html',
    styleUrls: ['./mapbg.component.css']
})

///Just a background component for login and register pages
export class MapBGComponent implements AfterViewInit {
    constructor( @Inject(APP_CONFIG) private config: IAppConfig,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) { }

    // google maps zoom level
    zoom: number = 8;

    // initial center position for the map
    lat: number;
    lng: number;

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.loadMapWithCurrentLocation();
        }
    }

    loadMapWithCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.setPosition.bind(this));
        }
    }

    setPosition(position) {
        this.setCoordinates(position);
    }

    setCoordinates(position) {
        if (position.code) {
            this.setLatLng(this.config.lat, this.config.long);
        } else {
            this.setLatLng(position.coords.latitude, position.coords.longitude);

        }
    }
    setLatLng(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }

    ///load map at current location
}
