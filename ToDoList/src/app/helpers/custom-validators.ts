import { AbstractControl} from "@angular/forms";

export class CustomValidators{

    public static mail(control: AbstractControl){
        const regex: RegExp=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+/;
        return regex.test(control.value) ? null : {mail: true};
    }
}