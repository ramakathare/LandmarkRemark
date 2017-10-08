import { Component, Input, OnChanges } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../config';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CcaNotiService } from '../../../modules/cca-noti';
import { AuthService } from '../../shared/services'

import { PasswordValidation } from '../../shared/validators/password.validation';

export interface IRegisterModel {
    Email: string,
    Password: string,
    ConfirmPassword: string
}

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    registerForm: FormGroup;
    registerModel: IRegisterModel = {
        Email: '',
        Password: '',
        ConfirmPassword: ''
    }

    constructor(
        private ccaNotiService:CcaNotiService,
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
        this.createRegisterForm();
    }

    createRegisterForm() {
        this.registerForm = this.formBuilder.group({
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', Validators.required],
            ConfirmPassword: ['', Validators.required]
        }, {
                validator: PasswordValidation.MatchPassword // your validation method
            });
    }

    ngOnChanges() {
        this.registerForm.reset(this.registerModel);
    }

    submitRegister() {

        if (this.registerForm.invalid) return;

        const formModel: IRegisterModel = this.registerForm.value as IRegisterModel;
        
        this.authService.saveRegistration(formModel).subscribe((response) => {
            this.ccaNotiService.success("Proceed to Login", "Registered successfully.");
            this.ngOnChanges();
            this.router.navigate(['/login']);
        });
        
    }
}
