import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'angular2-cookie/services';
import { APP_CONFIG, IAppConfig } from '../../../config';
import { LmrHttp } from '../../../modules/lmr-http'
import { Headers, RequestOptions } from '@angular/http';
import { LmrNotiService } from '../../../modules/lmr-noti'

export interface IAuthentication {
    isAuth: boolean,
    userName: string,
    token:string,
    token_type: string
};

@Injectable()
export class AuthService {

    constructor(private _cookieService: CookieService,
        private chttp: LmrHttp,
        private Lmrnotiservice: LmrNotiService,
        @Inject(APP_CONFIG) private config: IAppConfig
    ) {

    }

    public authentication: IAuthentication = {
        isAuth: false,
        userName: "",
        token: "",
        token_type: ""
    };
    public lastRestrictedPage = "";

    //to regiser a new user
    public saveRegistration(registration) {
        return this.chttp.postObservable(`${this.config.apiEndpoint}/api/Account/Register`, registration);
    }

    //login code. 
    public login(loginData, callback: () => void) {
        let data = "grant_type=password&username=" + loginData.Email + "&password=" + loginData.Password;

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');

        //The apiend point is the token end point
        this.chttp.postObservable(`${this.config.apiEndpoint}/token`, data, options).subscribe((response) => {
            //once the token obtained set the local variables
            this.authentication.isAuth = true;
            this.authentication.userName = response.userName;
            this.authentication.token = response.access_token;
            this.authentication.token_type = response.token_type;

            //if the login form has remember me enabled we need to store the token in cookie with expiry data as current date + expiry of the token in seconds
            if (loginData.RememberMe) {
                var date = new Date();
                date.setSeconds(date.getSeconds + response.expires_in);
                this._cookieService.putObject('authorizationData', this.authentication, { expires: date })
            }
            callback();
        });
    }
    private _logOutCallback(isSilent) {
        //Once logged reset authentication, remove data from cookies and show message
        //this.resetAuthentication();
        //this._cookieService.remove('authorizationData');
        if (!isSilent) this.Lmrnotiservice.info("You have successfully logged off.");
    }

    //logout service
    public logOut(isSilent,callback:()=>void) {
        this.chttp.postObservable(`${this.config.apiEndpoint}/api/Account/Logout`, null).subscribe((response) => {
            //once logged out from server clear the local data, remove from cookies and fire callback if any
            this.resetAuthentication();
            this._cookieService.remove('authorizationData'); 
            this._logOutCallback(isSilent);
            callback();
        });
    }
    //reset local variables
    private resetAuthentication() {
        this.authentication.isAuth = false;
        this.authentication.userName = "";
        this.authentication.token = "";
        this.authentication.token_type = "";
    }

    //get data from the cookies and populate the local data
    public fillAuthData() {
        var authorizationData = (this._cookieService.getObject("authorizationData") || {}) as IAuthentication;
        if (authorizationData) {
            this.authentication.isAuth = authorizationData.isAuth;
            this.authentication.userName = authorizationData.userName;
            this.authentication.token = authorizationData.token;
            this.authentication.token_type = authorizationData.token_type;
        }
    }
}
