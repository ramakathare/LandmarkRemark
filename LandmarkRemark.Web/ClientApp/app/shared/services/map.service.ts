import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Injectable()
export class MapsService {
    constructor(private __loader: MapsAPILoader) {

    }

    //To get geocode address from lat and log
    getGeocoding(lat: number, lng: number): Observable<any> {
        return Observable.create(observer => {
            try {
                //at this point the variable google may be still undefined (google maps scripts still loading)
                //so load all the scripts, then...
                this.__loader.load().then(() => {
                    let geocoder = new google.maps.Geocoder();
                    let latlng = new google.maps.LatLng(lat, lng);
                    let request = { latLng: latlng };

                    geocoder.geocode(request, (results, status) => {
                        if (status == google.maps.GeocoderStatus.OK) {
                            let result = results[0];
                            observer.next(result);
                            observer.complete();

                        } else {
                            console.error('Error - ', results, ' & Status - ', status);
                            if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                                observer.error('Address not found!');
                            } else {
                                observer.error(status);
                            }

                            observer.complete();
                        }
                    });
                });
            } catch (error) {
                observer.error('error getGeocoding' + error);
                observer.complete();
            }

        });
    }
}
