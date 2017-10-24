import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LmrHttp } from './lmr-http.service';

import { TransferState } from '../transfer-state/transfer-state';

export * from './cookie-store.service';
export * from './lmr-http.service';
export * from './http-header.model';
export * from './request-interceptor.interface';
export * from './response-interceptor.interface';
export * from './responseError-interceptor.interface';

@NgModule({
    exports: [],
    imports: [HttpModule],
    providers: [LmrHttp,TransferState]
})
export class LmrHttpModule {
    /** @deprecated */
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: LmrHttpModule,
            providers: [TransferState]
        };
    }
}