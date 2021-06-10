import { AbstractControl, ValidatorFn} from "@angular/forms";

export class CustomValidators{

    public static mail(control: AbstractControl){
        const regex: RegExp=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+/;
        return regex.test(control.value) ? null : {mail: true};
    }

    public static password(control: AbstractControl){
        const regex: RegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/;
        return regex.test(control.value) ? null : {password: true};
    }

    public static passwordLength(value: number): ValidatorFn{
        return (control: AbstractControl): {[key: string]: any} => {
            return control.value && control.value.trim().length >= value ? null : {passwordLength: true};
        }
    }

    public static estimatedTime(control: AbstractControl){
        const regex: RegExp=/[0-9]{0,}-[0-9]{0,2}-[0-9]{0,2}/;
        return regex.test(control.value) ? null : {estimatedTime: true};
    }

    public static date(control: AbstractControl){
        const regex: RegExp=/[0-9]{0,}-[0-9]{0,2}-[0-9]{0,4}/;
        return regex.test(control.value) ? null : {date: true};
    }
}