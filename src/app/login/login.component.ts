import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  @Output() currentName = new EventEmitter<string>();

  ngOnInit() {
  }
  submit() {
    this.invalidPassword = false;
    this.emailNotFound = false;
    this.userDisabled = false;
    this.otherError = false;
    interface ReciveFirebaseData{
      idToken: string;
    }

    interface ReciveServerData{
      data: {
        username: string
      };
    }
    this.authService.login(this.email.value, this.password.value)
      .then(data => {
            localStorage.setItem('X-Firebase-Auth', ((data as any) as ReciveFirebaseData).idToken);

            this.currentName.emit(this.email.value);
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
