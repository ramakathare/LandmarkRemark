import {
    Component, Input, OnInit, OnDestroy,
    // animation imports
    trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { LmrNotiService } from './lmr-noti.service';

const DEFAULT_TIMEOUT = 3000;

@Component({
    selector: 'lmr-noti-indicator',
    templateUrl: './lmr-noti.component.html',
    styleUrls: ['./lmr-noti.component.css'],
    animations: [
        // Animation example
        // Triggered in the ngFor with [@flyInOut]
        trigger('flyInOut', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(+100%)' }),
                animate('0.2s ease-in')
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateY(+100%)' }))
            ])
        ])
    ]
})
export class LmrNoti implements OnInit, OnDestroy {

    subscription: Subscription;

    @Input()
    timeout: number;

    public notifications: any[];

    constructor(private Lmrnotiservice: LmrNotiService) {
        this.notifications = [];
    }

    ngOnInit() {
        let that = this;
        this.subscription = this.Lmrnotiservice.notifyObservable$.subscribe((noti) => {
            that.checkin(noti);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    checkin(noti) {
        //this.removenoti(this.notifications[this.notifications.length - 1]);
        let elemExists: boolean = false;
        if (this.notifications.length > 0) {
            for (let elem of this.notifications) {
                if (elem.body === noti.body) elemExists = true;
            }
        }
        if (!elemExists) this.notifications.push(noti);
        noti.timeout = this.timeout || DEFAULT_TIMEOUT;
        noti.timer = setInterval(() => {
            if (!noti.mouseover) noti.timeout = noti.timeout - 300;
            if (noti.timeout <= 0) {
                clearInterval(noti.timer);
                this.removenoti(noti);
            }
        }, 300)
    }
    notificationClicked(noti) {
        noti.timer == 0;
    }
    removenoti(noti:any) {
        let index: number = this.notifications.indexOf(noti);
        if (index !== -1) {
            this.notifications.splice(index, 1);
        } 
    }
}
