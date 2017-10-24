import {
    Component, Input, OnInit, OnDestroy,
    // animation imports
    //trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { LmrLoaderService } from './lmr-loader.service';


import { Subject } from 'rxjs/Subject';

const DEFAULT_INDICATOR_DELAY = 500;

@Component({
    selector: 'lmr-loading-indicator',
    templateUrl: './lmr-loader.component.html',
    styleUrls: ['./lmr-loader.component.css'],
    //animations: [
    //    trigger('flyInOut', [

    //        state('shown', style({ transform: 'translateX(0)' })),
    //        transition('void => *', [
    //            style({ transform: 'translateY(-100%)' }),
    //            animate(500)
    //        ]),
    //        transition('* => void', [
    //            animate(500, style({ transform: 'translateY(100%)' }))
    //        ]),

    //        //state('hidden', style({ transform: 'translateX(0)' })),
    //        //transition('void => *', [
    //        //    style({ transform: 'translateY(-100%)' }),
    //        //    animate(500)
    //        //]),
    //        //transition('* => void', [
    //        //    animate(500, style({ transform: 'translateY(100%)' }))
    //        //])
    //    ])
    //]
})
export class LmrLoader implements OnInit, OnDestroy {

    subscription: Subscription;

    showIndicatorCounter: number = 0;
    showIndicator: boolean = false;

    @Input()
    indicatorDelay: number;

    constructor(private Lmrloaderservice: LmrLoaderService) {
        let that = this;
        this.subscription = this.Lmrloaderservice.loaderObservable$.subscribe((res) => {
            if (res === true)
                that.startLoader();
            else
                that.stopLoader();
        });
    }

    ngOnInit() {
        
        
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    startLoader() {
        let that = this;

        this.showIndicatorCounter++;

        if (this.indicatorDelay) {
            setTimeout(() => {
                if (that.shouldShowIndicator) {
                    this.showIndicator = true;
                }
            }, this.indicatorDelay || DEFAULT_INDICATOR_DELAY);
        }
        else if (this.shouldShowIndicator) {
            this.showIndicator = true;
        }
    }

    stopLoader() {
        this.showIndicatorCounter--;

        if (this.shouldHideIndicator) {
            this.showIndicator = false;
        }
    }

    //stopLoaderOnError() {
    //    this.showIndicatorCounter--;

    //    if (this.shouldHideIndicator) {
    //        this.showIndicator = false;
    //    }
    //}

    get shouldShowIndicator() {
        return this.showIndicatorCounter > 0;
    }

    get shouldHideIndicator() {
        return this.showIndicatorCounter < 1;
    }
}