﻿import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { LmrNotiService } from './lmr-noti.service';
import { LmrNoti } from './lmr-noti.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { APP_CONFIG, AppConfig, IAppConfig } from '../../config';


export function createTranslateLoader(http: Http, appConfig) {
    //// Temporary Azure hack
    //if (baseHref === null && typeof window !== 'undefined') {
    //    baseHref = window.location.origin;
    //}
    // i18n files are in `wwwroot/assets/`
    return new TranslateHttpLoader(http, `${appConfig.appEndpoint}/assets/i18n/`, '.json');
}

export * from './lmr-noti.service';

@NgModule({
    exports: [LmrNoti],
    declarations: [LmrNoti],
    imports: [CommonModule,// i18n support
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http,APP_CONFIG]
            }
        }),],
    providers: [LmrNotiService, { provide: APP_CONFIG, useValue: AppConfig }]
})
export class LmrNotiModule {
}