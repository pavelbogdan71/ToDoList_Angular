import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from '../helpers/custom-validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {

  registerFormInstance: FormGroup = new FormGroup({});
  hide = true;
  user: any = {};

  constructor(private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.registerFormInstance = this.formBuilder.group({
      email: ["",{
        validators: [Validators.compose([
          Validators.required,
          CustomValidators.mail
        ])],
        updateOn: 'blur'
      }],
      password: ["",{
        validators: [Validators.compose([
          Validators.required,
          CustomValidators.passwordLength(6),
          CustomValidators.password
        ])],
        updateOn: 'blur'
      }],
      passwordConfirmation: ["",{
        validators: [Validators.compose([
          Validators.required,
        ])],
        updateOn: 'blur'
      }],
      lastName: ["",Validators.required],
      firstName: ["",Validators.required]
    }, {
      validator: this.mustMatch('password', 'passwordConfirmation')
  });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  onRegistration(){
    this.user = this.registerFormInstance.value;
    this.addUser(this.user);

    this.openSnackBar();
  }

  addUser(user){
    let users = [];
    if(localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users'));
      users = [user, ...users];
    }else{
      users = [user];
    }
    localStorage.setItem('Users',JSON.stringify(users));
  }

  openSnackBar() {
    this._snackBar.open('Register Successful!!','OK',{
      horizontalPosition:'start',
      verticalPosition: 'bottom',
    });
  }

  get email(){
    return this.registerFormInstance.get("email");
  }

  get password(){
    return this.registerFormInstance.get("password");
  }

  get passwordConfirmation(){
    return this.registerFormInstance.get("passwordConfirmation");
  }

  get lastName(){
    return this.registerFormInstance.get("lastName");
  }

  get firstName(){
    return this.registerFormInstance.get("firstName");
  }
}
