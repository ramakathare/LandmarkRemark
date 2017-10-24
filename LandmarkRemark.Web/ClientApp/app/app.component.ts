import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation, ViewChild, RendererFactory2, PLATFORM_ID, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationError, NavigationCancel, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { Meta, Title, DOCUMENT, MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { isPlatformServer } from '@angular/common';

// i18n support
import { TranslateService } from '@ngx-translate/core';
import { LinkService } from './shared/services';
import { LmrHttp, HttpHeader } from '../modules/lmr-http';
import { LmrLoaderService } from '../modules/lmr-loader';
import { LmrNotiService } from '../modules/lmr-noti';
import { BrowserModule } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './shared/services';

import { AppConfig } from "../config/index"
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {


    // This will go at the END of your title for example "Home - Angular Universal..." <-- after the dash (-)
    private endPageTitle: string = 'Angular Universal and ASP.NET Core Starter';
    // If no Title is provided, we'll use a default one before the dash(-)
    private defaultPageTitle: string = 'My App';

    private routerSub$: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private chttp: LmrHttp,
        public translate: TranslateService,
        private linkService: LinkService,
        private Lmrloaderservice: LmrLoaderService,
        private Lmrnotiservice: LmrNotiService,
        private authService: AuthService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }

    ngOnInit() {
        this._registerNavigationStartEvents();

        this._registerNavigationErrorEvents();
        this._registerNavigationCancelEvents();

        this._registerNavigationEndEvents();

        this._setInterceptor();
        this.loaddata();

    }

    ngOnDestroy() {
        // Subscription clean-up
        this.routerSub$.unsubscribe();
    }

    loaddata() {
        //debugger;
        let thatObj = this;

        if (isPlatformBrowser(this.platformId)) {
            //Client only code.
            thatObj.authService.fillAuthData();
            console.log("this is client");

        }
        if (isPlatformServer(this.platformId)) {
            // Server only code.
            console.log("this is server");

        }
    }

    //Register interceptors ot the http request response calls
    private _setInterceptor() {
        var that = this;
        //register the request interceptor
        this.chttp.registerRequestInterceptor({
            beforeRequestAsync: function (url, method, data, headers) {

                return new Promise((resolve, reject) => {

                    //if the request has header noLoader no need to show the loader
                    if (!headers.find(p => p.key == "noLoader"))
                        that.Lmrloaderservice.setLoader(true);

                    //if the user authentication is already present send the token to the server
                    if (that.authService.authentication.isAuth) {
                        headers.push(new HttpHeader("Authorization", "bearer " + that.authService.authentication.token));
                    }

                    // resolve with true to fully intercept request
                    // resolve with false to let the request continue
                    resolve(false);
                });
            }
        });

        //register the response error interceptor
        this.chttp.registerResponseErrorInterceptor({
            afterResponseErrorAsync: function (response, url, method, data, headers) {
                return new Promise((resolve, reject) => {

                    //if the header has noLoader no need to stop the loader
                    if (!headers.find(p => p.key == "noLoader"))
                        that.Lmrloaderservice.setLoader(false);

                    //if the header has noNoti no need to show any notifications
                    if (!headers.find(p => p.key == "noNoti")) {
                        //else present the notification with response statustext
                        if (response.status == 401) {
                            response.statusText = "Unauthorized request.";
                        } else {
                            response.statusText = response.statusText || "Unknown error has occured.";
                        }
                        that.Lmrnotiservice.error(response.statusText);

                    }

                    reject(response);
                });
            }
        });

        //register the response interceptor
        this.chttp.registerResponseInterceptor({
            afterResponseAsync: function (response, url, method, data, headers) {
                return new Promise((resolve, reject) => {

                    if (!headers.find(p => p.key == "noLoader"))
                        that.Lmrloaderservice.setLoader(false);
                    if (!headers.find(p => p.key == "noNoti")) {
                        if (response.message) {
                            that.Lmrnotiservice.success(response.message);
                        }
                    }
                    resolve(response);
                });
            }
        });
    }
    ///Register custom code on every rout start event
    private _registerNavigationStartEvents() {
        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationStart)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {

                this.Lmrloaderservice.setLoader(true);
            });
    }

    ///Register custom code on every route error event
    private _registerNavigationErrorEvents() {
        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationError)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this.Lmrloaderservice.setLoader(false);
            });
    }

    ///Register custom code on every route cancel event
    private _registerNavigationCancelEvents() {
        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationCancel)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this.Lmrloaderservice.setLoader(false);
            });
    }

    ///Register custom code on every route end event
    private _registerNavigationEndEvents() {
        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {

                this._setMetaAndLinks(event);
                this.Lmrloaderservice.setLoader(false);
            });
    }

    //set meta data, title and other links for SEO
    private _setMetaAndLinks(event:any) {

        // Set Title if available, otherwise leave the default Title
        const title = event['title']
            ? `${event['title']} - ${this.endPageTitle}`
            : `${this.defaultPageTitle} - ${this.endPageTitle}`;

        this.title.setTitle(title);

        const metaData = event['meta'] || [];
        const linksData = event['links'] || [];

        for (let i = 0; i < metaData.length; i++) {
            this.meta.updateTag(metaData[i]);
        }

        for (let i = 0; i < linksData.length; i++) {
            this.linkService.addTag(linksData[i]);
        }
    }
}

