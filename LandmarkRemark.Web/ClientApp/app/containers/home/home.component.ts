import { Component, OnInit, AfterViewInit, Inject, HostListener, PLATFORM_ID, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, MapsService, NoteService } from '../../shared/services';
import { APP_CONFIG, IAppConfig } from '../../../config';
import { isPlatformBrowser } from '@angular/common';
import { LmrNotiService } from '../../../modules/lmr-noti'
import { MapsAPILoader, AgmMap } from '@agm/core';
import { INotes } from '../../models';

declare var google: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    @ViewChild('recenter') recenterEle: ElementRef;
    @ViewChild(AgmMap) myMap: AgmMap;

    public isCollapsed: boolean = true;
    public title: string = 'Angular 4.0 Universal & ASP.NET Core 2.0 advanced starter-kit';
    public email: string = "";
    public lat: number;
    public lng: number;
    public iconUrl: string;
    public notesIconUrl: string;
    public notesIconOtherUrl: string;
    public filter: string;
    public listView: boolean;
    public locationResolved: boolean;
    public locationResolveFailed: boolean;
    // google maps zoom level
    public zoom: number = 15;
    public Editable: boolean = false;

    markers: INotes[] = []

    // Use "constructor"s only for dependency injection
    constructor(
        private authService: AuthService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_CONFIG) private config: IAppConfig,
        private Lmrnotiservice: LmrNotiService,
        private _loader: MapsAPILoader,
        private _zone: NgZone,
        private mapService: MapsService,
        private noteService: NoteService
    ) {
        this.iconUrl = config.iconUrl;
        this.notesIconUrl = config.notesIconUrl;
        this.notesIconOtherUrl = config.notesIconOtherUrl;

        this.listView = false;
        this.locationResolved = false;
        this.locationResolveFailed = false;
    }

    ngOnInit() {
        if (this.authService.authentication.isAuth) this.email = this.authService.authentication.userName;
        if (isPlatformBrowser(this.platformId)) {
            this.loadMapWithCurrentLocation();
            this.getMyNotes();
        }
    }
    ngAfterViewInit() {

    }
    //Log out from home
    logout() {
        this.authService.logOut(true, () => {
            this.router.navigate(['/login']);
        });
    }

    //obtain the current location using geolocation object
    loadMapWithCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.setPosition.bind(this));
        }
    }

    //set current coordinates and add initial blank notes at current location
    setPosition(position) {
        this.setCoordinates(position)
        this.adNotesatCurrentLocation();
    }

    ///set land and log
    setCoordinates(position) {
        if (position.code) {
            //if position is not obtained load defaults lat lng configured in app config
            this.setLatLng(this.config.lat, this.config.long);
        } else {
            this.setLatLng(position.coords.latitude, position.coords.longitude);
        }
    }

    //Add initial blank notes at current location and resolve address
    adNotesatCurrentLocation() {
        var that = this;
        var marker: INotes = {
            date: new Date(),
            draggable: true,
            notes: "",
            lat: this.lat,
            lng: this.lng,
            user: this.authService.authentication.userName,
            isHome: true,
            address: "Not obtained yet.",
            isOwner: true,
            noteId: 0,
            isLocal: true
        }
        this.markers.push(marker);
        this.addAddressToNotes(this.lat, this.lng, marker, function () {
            //some times the map is not rendered. A hack to resolve the issue
            setTimeout(() => { that.recenterEle.nativeElement.click(); }, 100);
        });
    }

    //click event fired when the map is clicked. this will load notes at the location and resovle address
    mapClicked($event: any) {

        var lat = $event.coords.lat;
        var lng = $event.coords.lng;

        var marker: INotes = {
            date: new Date(),
            draggable: true,
            notes: "",
            lat: lat,
            lng: lng,
            user: this.authService.authentication.userName,
            isHome: false,
            address: "Not obtained yet.",
            isOwner: true,
            noteId: 0,
            isLocal: true
        }
        this.markers.push(marker);
        this.addAddressToNotes(lat, lng, marker);
    }

    //To get the formatted address from the lat and lng and add to the notes.
    addAddressToNotes(lat: number, lng: number, marker: INotes, callback?: () => void) {
        this.mapService.getGeocoding(lat, lng).subscribe((result) => {
            if (result != null) {
                this.locationResolved = true;
                marker.address = result.formatted_address;
                if (callback) callback();
            }
            else {
                this.addressFailedCallback(marker);
            }
        }, () => {
            this.addressFailedCallback(marker);
        });

    }

    //callback if the location is not resolved
    addressFailedCallback(marker: INotes) {
        this.locationResolved = true;
        this.locationResolveFailed = true;
        marker.address = "Failed to resolve address!";
        alert("Failed to resolve address!!")
    }

    //assign lat lngs on the map
    setLatLng(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }

    //This is fired when a notes clicked from the list view. This will recenter the map to the notes lat lng
    listViewMarkerClicked(m) {
        this.myMap.triggerResize()
            .then(() => (this.myMap as any)._mapsWrapper.setCenter({ lat: m.lat, lng: m.lng }));
    }
    //This is fired when the user clicks on the Home marker icon beside the Landmark Remark brand
    //This is recenter the map to the home location
    reCenter() {
        this.myMap.triggerResize()
            .then(() => (this.myMap as any)._mapsWrapper.setCenter({ lat: this.lat, lng: this.lng }));
    }

    //When a marker is dragged the updated coordinates are assigned to the notes.
    markerDragEnd(m: INotes, $event: any) {
        console.log('dragEnd', m, $event);
        m.lat = $event.coords.lat;
        m.lng = $event.coords.lng

        if (m.isHome) {
            this.lat = m.lat;
            this.lng = m.lng;
        }

        this.addAddressToNotes(m.lat, m.lng, m, () => {
            //if the notes is on the server then update the notes with the latest address and lat lng
            if (m.noteId > 0) this.updateNotes(m);
        });
    }

    //marker clicked event
    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    //updates the notes to the server
    updateNotes(m: INotes) {
        this.noteService.updateNote(m).subscribe((response) => {
            console.log(response);
            m.Editable = false;
        });
    }

    //add new notes to the server
    saveNotes(m: INotes) {
        if (m.noteId > 0) this.updateNotes(m);
        else this.addNotes(m);
    }

    addNotes(m: INotes) {
        this.noteService.addNote(m).subscribe((response) => {
            //assign the identity of the new notes to the local notes object
            m.noteId = response.NoteId;
        });
    }

    //get notes using the search key
    filterNotes() {
        this.markers = this.markers.filter(p => {
            return p.isHome;
        });
        this.getMyNotes(this.filter);
    }

    //Get all notes from server. If the filter is null all the notes are retrieved
    //else notes filtered are retrieved
    getMyNotes(filter?: string) {
        this.noteService.getNotes(filter || "").subscribe((response) => {
            response.forEach((item, index, array) => {
                this.markers.push({
                    lat: item.Lat,
                    lng: item.Lng,
                    notes: item.Notes,
                    date: new Date(item.Date),
                    user: item.User,
                    draggable: item.Draggable,
                    isHome: item.IsHome,
                    address: item.Address,
                    noteId: item.NoteId,
                    isOwner: item.IsOwner,
                    isLocal: false
                });
            });
        });
    }

    //Helper to display formtted date on the notes
    formatDate(date: Date) {
        var dte = new Date(date);
        dte.setTime(dte.getTime() - dte.getTimezoneOffset() * 60 * 1000);
        return dte.toLocaleString();
    }
}
