import { NgModule, Inject, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'angular2-cookie/services';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { LmrHelper } from '../modules/lmr-helper';
import { LmrHttpModule } from '../modules/lmr-http';
import { LmrNotiModule } from '../modules/lmr-noti';
import { LmrLoaderModule } from '../modules/lmr-loader';





import { CheckLogin } from './shared/guards';

import { APP_CONFIG, AppConfig, IAppConfig } from '../config';

// i18n support
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

import { HomeComponent, LoginComponent, RegisterComponent, MapBGComponent } from './containers';

import { LinkService, AuthService, MapsService, NoteService } from './shared/services';

//helper for translator module
export function createTranslateLoader(http: Http,appConfig) {
    return new TranslateHttpLoader(http, `${appConfig.appEndpoint}/assets/i18n/`, '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MapBGComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        Ng2BootstrapModule.forRoot(), // You could also split this up if you don't want the Entire Module imported
        LmrHttpModule, LmrNotiModule, LmrLoaderModule,
        // i18n support
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http, APP_CONFIG]
            }
        }),
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyDq-YVtq14EO2vOknoqYdwq9qlz3g52PHI"
        }),
        // App Routing
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                ///already logged in should not go to login again
                path: 'login', component: LoginComponent,
                canActivate: [CheckLogin],
                data: {
                    title: 'Login',
                    meta: [{ name: 'description', content: 'Login page!' }],
                }
            },
            {
                path: 'register', component: RegisterComponent,
                data: {
                    title: 'Register',
                    meta: [{ name: 'description', content: 'Register page!' }],
                }
            },
            {
                path: 'home', component: HomeComponent,
                canActivate: [CheckLogin],
                // *** SEO Magic ***
                // We're using "data" in our Routes to pass in our <title> <meta> <link> tag information
                // Note: This is only happening for ROOT level Routes, you'd have to add some additional logic if you wanted this for Child level routing
                // When you change Routes it will automatically append these to your document for you on the Server-side
                //  - check out app.component.ts to see how it's doing this
                data: {
                    title: 'Home',
                    meta: [{ name: 'description', content: 'Home page!' }],
                }
            },

            // All else fails - go home!
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        LmrHelper,
        { provide: APP_CONFIG, useValue: AppConfig },
        TranslateModule,
        LinkService,
        CookieService,
        AuthService,
        CheckLogin, GoogleMapsAPIWrapper, MapsService, NoteService
    ]

})
export class AppModuleShared {
}
