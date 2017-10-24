import { Component, Input, OnChanges, PLATFORM_ID} from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../config';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { LmrNotiService } from '../../../modules/lmr-noti';
import { AuthService } from '../../shared/services'


export interface ILoginModel {
    Email: string,
    Password: string,
    RememberMe: boolean
}

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    loginModel: ILoginModel = {
        Email: '',
        Password: '',
        RememberMe:false
    }

    constructor(
        private LmrNotiService: LmrNotiService,
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
       
        this.createLoginForm(); 
    }

    createLoginForm() {
        this.loginForm = this.formBuilder.group({
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', Validators.required],
            RememberMe:[false] 
        });
    }
    
    submitLogin() {
        if (this.loginForm.invalid) return;

        const loginModel: ILoginModel = this.loginForm.value as ILoginModel;

        this.authService.login(loginModel, () => {
            //if the user is redirected to the login page from a restricted page, he is redirected to the same again after login
            this.router.navigate([this.authService.lastRestrictedPage || '/']);
        });
    }
}
