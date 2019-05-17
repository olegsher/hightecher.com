import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from '../registration/confirm-password-validator';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-service/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  constructor(private authService: AuthService) { }
  invalidPassword = false;
  emailNotFound = false;
  userDisabled = false;
  otherError = false;
  ngOnInit() {
  }
  submit() {
    this.invalidPassword = false;
    this.emailNotFound = false;
    this.userDisabled = false;
    this.otherError = false;
    this.authService.login(this.email.value, this.password.value)
      .subscribe(data => {
        // console.log(data);
        localStorage.setItem('X-Firebase-Auth', data.idToken);
        this.form.reset();
      }, error => {
        // console.log(error.error.message);
        switch (error.error.error.message) {
          case 'INVALID_PASSWORD':
            this.invalidPassword = true;
            break;
          case 'EMAIL_NOT_FOUND':
            this.emailNotFound = true;
            break;
          case 'USER_DISABLED':
            this.userDisabled = true;
            break;
          default:
            this.otherError = true;
        }
        // console.log(error);
      });

  }
  get password() {
    return this.form.get('password');
  }
  get email() {
    return this.form.get('email');
  }
  get isLogIn() {
    return localStorage.getItem('X-Firebase-Auth');
  }

  logout() {
    localStorage.removeItem('X-Firebase-Auth');
  }
  get isInvalidPassword() {
    return this.invalidPassword;
  }
  get isEmailNotFound() {
    return this.emailNotFound;
  }
  get isUserDisabled() {
    return this.userDisabled;
  }
  get isOtherError() {
    return this.otherError;
  }

}
