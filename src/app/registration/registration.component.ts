import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from './confirm-password-validator';
import {AuthService} from '../auth-service/auth-service.service';
import {ServerRequestsService} from '../server-requests/server-requests.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),

    first_name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern('(\\+972-5)|(\\+9725)|(05.)\\d{7}')]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required,
        Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]),

      password_confirmation: new FormControl('', Validators.required)
    }, [], ConfirmPasswordValidator.match)
  });
  registrationSuccess = false;
  constructor(private authService: AuthService, private serverRequest: ServerRequestsService) { }

  ngOnInit() {
  }
  submit() {
    console.log(this.form);
    this.serverRequest.registerUser(this.username.value, this.email.value, this.password.value, this.first_name.value,
    this.surname.value, this.phone.value)
      .subscribe(data => {
        console.log(data);
        this.registrationSuccess = true;
        this.form.reset();
      }, error => console.log(error));
  }
  get password_confirmation() {
    return this.form.get('passwords').get('password_confirmation');
  }
  get password() {
    return this.form.get('passwords').get('password');
  }
  get passwords() {
    return this.form.get('passwords');
  }
  get first_name() {
    return this.form.get('first_name');
  }
  get surname() {
    return this.form.get('surname');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get username() {
    return this.form.get('username');
  }
}
