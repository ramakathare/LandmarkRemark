import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LmrLoaderService } from './lmr-loader.service';
import { LmrLoader } from './lmr-loader.component';

export * from './lmr-loader.service';

@NgModule({
    exports: [LmrLoader],
    declarations: [LmrLoader],
    imports: [CommonModule],
    providers: [LmrLoaderService]
})
export class LmrLoaderModule {
}