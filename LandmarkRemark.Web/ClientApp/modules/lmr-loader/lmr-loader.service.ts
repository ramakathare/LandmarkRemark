import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LmrLoaderService {
    constuctor() { }

    private loader = new Subject<any>();
    loaderObservable$ = this.loader.asObservable();

    public setLoader(data: any) {
        this.loader.next(data);
    }
}