import { TestBed, inject, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { } from 'jasmine';
import { AuthService } from './auth.service';

import { APP_CONFIG, IAppConfig, AppConfig } from '../../../config';
import { CookieService } from 'angular2-cookie/services';
import { CcaNotiService } from '../../../modules/cca-noti';
import { CcaHttpModule } from '../../../modules/cca-http';
import { CcaHttp } from '../../../modules/cca-http';
import { XHRBackend, BaseRequestOptions, Http, ResponseOptions, Response } from "@angular/http";
import { MockConnection } from "@angular/http/testing";


describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CcaHttpModule],
            providers: [
                { provide: APP_CONFIG, useValue: AppConfig },
                AuthService,
                CookieService,
                CcaNotiService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }]
        });
        TestBed.compileComponents();

    });


    it('should ...', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));
    it('should ...', inject([AuthService], (service: AuthService) => {
        expect(service.authentication.isAuth).toBeFalsy();
    }));

    var loginData = {
        username: "ramakathare1@gmail.com",
        password: "1234",
        grant_type: "password"
    }

    var registerData = {
        username: "ramakathare1@gmail.com",
        password: "1234",
        confirmPassword: "1234"
    }


    it('should register',
        inject([AuthService, MockBackend], (service: AuthService, mockBackend: MockBackend) => {

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(
                        new Response(
                            new ResponseOptions({
                                body: []
                            }))
                    );
                });
            service.saveRegistration(registerData).subscribe(p => {
                expect(p).toBeDefined();
            }, (err) => {
                expect(err).toBeDefined();
            }, () => {
            });
        }));

    it('should login',
        inject([AuthService, MockBackend], (service: AuthService, mockBackend: MockBackend) => {

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(
                        new Response(
                            new ResponseOptions({
                                body: {
                                }
                            }))
                    );
                });
            

            service.login(loginData, () => {
                expect(service.authentication.isAuth).toBeTruthy();
            });
        }));
});
