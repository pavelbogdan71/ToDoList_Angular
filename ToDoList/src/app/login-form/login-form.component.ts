import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {

  hide = true;
  loginFormInstance: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginFormInstance = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required],
      rememberMe: [false]
    });
  }

  onLogin(){
    let user = this.loginFormInstance.value;
    this.checkUser(user);
  }

  checkUser(user){
    let users = [];

    if(localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users'));
      users.forEach((value) => {
        if(value.email===user.email && value.password===user.password){
          (<any>this.router).navigate(["/homepage"]);
        }
      });
    }
  }

  onRegister(){
    (<any>this.router).navigate(["/register"]);
  }

  get email(){
    return this.loginFormInstance.get("email");
  }

  get password(){
    return this.loginFormInstance.get("password");
  }

  get rememberMe(){
    return this.loginFormInstance.get("rememberMe");
  }
}
