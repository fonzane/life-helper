import { AbstractControl, ValidatorFn } from "@angular/forms";

export function scheduleValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const valid = /[0-2][0-9]:[0-5][0-9]/.test(control.value);
        return valid ? null : {forbiddenName: {value: control.value}};
    }
}