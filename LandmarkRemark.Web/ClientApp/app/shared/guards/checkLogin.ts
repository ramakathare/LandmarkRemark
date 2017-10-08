import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../services";
import { Subscription } from 'rxjs/Subscription';
import { isPlatformBrowser } from '@angular/common';

///Check login guard. This is used to reroute the user to login page if not authenticated
@Injectable()
export class CheckLogin implements CanActivate {


    constructor(private authService: AuthService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object, ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //only if the code is run on browser
        if (isPlatformBrowser(this.platformId)) {

            var goingToLoginPage = state.url == "/login"; //user is trying to visit the login page.
            var userAuthenticatedAlready = this.authService.authentication.isAuth; //user is authenticated

            //user is not authenticated and not going to login page
            //send them to the login page
            if (!userAuthenticatedAlready && !goingToLoginPage) {
                this.authService.lastRestrictedPage = state.url;
                this.router.navigate(['/login']);
                return false;
            }

            //user is already logged in and going to the login page again
            //send him to the home page instead
            if (userAuthenticatedAlready && goingToLoginPage) {
                this.router.navigate(['/home']);
                return false;
            }
        }
        return true;
    }
}
