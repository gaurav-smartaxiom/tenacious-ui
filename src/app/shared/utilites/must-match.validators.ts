import { FormControl, FormGroup } from '@angular/forms';

//custom validators that check two fields match
export const MustMatchValidators = (controlName:string, matchingControlName:string) => {
    return (formGroup:FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchControl = formGroup.controls[matchingControlName];

        if (control.value !== matchControl.value) {
            matchControl.setErrors({ mustMatch: true });
        } else {
            matchControl.setErrors(null);
        }
    }
}