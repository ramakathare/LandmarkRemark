import { IAppConfig } from './app-config.interface';
import { OpaqueToken, InjectionToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken("app.config");

//Static config variables used across app
export const AppConfig: IAppConfig = {
    apiEndpoint: "http://landmarkremarkapi.azurewebsites.net",
    appEndpoint: "http://landmarkremarkapp.azurewebsites.net",
    //apiEndpoint:"http://localhost:42055",
    //appEndpoint:"http://localhost:4196",
    windowHeight: "",
    lat: 1.2789803,
    long: 103.8445708,
    iconUrl : '/assets/home.png',
    notesIconUrl : '/assets/notes.png',
    notesIconOtherUrl : '/assets/notesOthers.png'
};
