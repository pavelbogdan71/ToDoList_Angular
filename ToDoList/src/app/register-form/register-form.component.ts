import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) { }

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
      password: ["",Validators.required],
      passwordConfirmation: ["",Validators.required],
      lastName: ["",Validators.required],
      firstName: ["",Validators.required]
    })
  }

  onRegistration(){
    this.user = this.registerFormInstance.value;
    this.addUser(this.user);
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
