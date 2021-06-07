import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {

  registerFormInstance: FormGroup = new FormGroup({});
  hide = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.registerFormInstance = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required],
      passwordConfirmation: ["",Validators.required],
      lastName: ["",Validators.required],
      firstName: ["",Validators.required]
    })
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
