import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
  public registerForm: FormGroup = new FormGroup({});

  public isLogin = true;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  public initForms(){
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.registerForm = this.formBuilder.group({
      username: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  public onLogin(){

  }

  public onRegister(){

  }

  public switchForm(){
    this.isLogin = !this.isLogin;
  }

}
