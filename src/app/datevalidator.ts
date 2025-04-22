import { AbstractControl, ValidatorFn } from "@angular/forms";

export class DateValidator {
    validate(val: string | Date) {
        let dateToValidate = new Date(val);
        if (dateToValidate > new Date()) {
            return true;
        }
        return false;
    }
}

    export function dateValidate(): ValidatorFn {
        return (control: AbstractControl) : {
            [key: string]: boolean
        } | null => {
            let val = new DateValidator()
            let valid = !control.value || val.validate(control.value);
            return valid ? null : {date : true}
        }
    }