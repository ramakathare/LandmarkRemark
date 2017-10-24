import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { INotes } from '../../models';
import { Observable } from 'rxjs/Observable';
import { LmrHttp } from '../../../modules/lmr-http/lmr-http.service';
import { APP_CONFIG, IAppConfig } from '../../../config';

@Injectable()
export class NoteService {

    constructor(
        private chttp: LmrHttp,
        @Inject(APP_CONFIG) private config: IAppConfig) {

    }

    getNotes(filter?:string): Observable<any[]> {
        return this.chttp.getObservable(`${this.config.apiEndpoint}/api/notes?filter=${filter}`);
    }

    getNote(note: INotes): Observable<INotes> {
        return this.chttp.getObservable(`${this.config.apiEndpoint}/api/notes/` + note.noteId);
    }

    deleteNote(note: INotes): Observable<any> {
        return this.chttp.deleteObservable(`${this.config.apiEndpoint}/api/notes/` + note.noteId);
    }

    updateNote(note: INotes): Observable<any> {
        return this.chttp.putObservable(`${this.config.apiEndpoint}/api/notes/` + note.noteId, note);
    }

    addNote(note: INotes): Observable<any> {
        return this.chttp.postObservable(`${this.config.apiEndpoint}/api/notes`, note)
    }
}
