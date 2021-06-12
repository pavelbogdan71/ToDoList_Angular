import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
    localStorage.setItem("ConnectedUser",null);
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

          if(!localStorage.getItem(value.email)){
            localStorage.setItem(value.email,null);
          }

          localStorage.setItem("ConnectedUser",JSON.stringify(value.email));
          (<any>this.router).navigate(["/homepage"]);
        }else{
          this.openSnackBar();
        }
      });
    }
  }

  openSnackBar() {
    this._snackBar.open('Email or password incorrect!!','OK',{
      horizontalPosition:'center',
      verticalPosition: 'bottom',
    });
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
