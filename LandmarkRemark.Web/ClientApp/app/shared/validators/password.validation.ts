import { AbstractControl } from '@angular/forms';
export class PasswordValidation {
    //validator to compare password and confirm password
    static MatchPassword(AC: AbstractControl) {
        let password = (AC.get('Password') as any).value; // to get value in input tag
        let confirmPassword = (AC.get('ConfirmPassword') as any).value; // to get value in input tag
        if (password != confirmPassword) {
            console.log('false');
            (AC.get('ConfirmPassword') as any).setErrors({ matchPassword: true })
        } else {
            console.log('true');
            return null
        }
    }
}
