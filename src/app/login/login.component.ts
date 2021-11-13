import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/services/auth.service";
import {User} from "../core/models/user.model";

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
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initForms();
  }

  /**
   * Form Initialization
   */
  public initForms() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  /**
   * Validate and login with given user details
   */
  public onLogin() {
    if (this.loginForm.valid) {
      const enteredUsername = this.loginForm.get('username')?.value;
      const enteredPassword = this.loginForm.get('password')?.value;
      this.authService.login(new User(enteredUsername, enteredPassword));
    } else {
      this.loginForm.markAllAsTouched();
    }

  }

  /**
   * Register User Details
   */
  public onRegister() {
    if (this.registerForm.valid) {
      const enteredUsername = this.registerForm.get('username')?.value;
      const enteredPassword = this.registerForm.get('password')?.value;
      const enteredConfirmPassword = this.registerForm.get('confirmPassword')?.value;
      if (enteredPassword.trim() === enteredConfirmPassword.trim()) {
        this.authService.register(new User(enteredUsername, enteredPassword));
        this.switchForm();
      } else {
        this.registerForm.get('confirmPassword')?.patchValue({confirmPassword: ''});
        this.registerForm.updateValueAndValidity({onlySelf: true});
      }
    }
  }

  /**
   * Switch between login and register forms
   */
  public switchForm() {
    this.isLogin = !this.isLogin;
  }

}
