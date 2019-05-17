import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from './confirm-password-validator';
import {AuthService} from '../auth-service/auth-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    passwords: new FormGroup({
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required)
    }, [], ConfirmPasswordValidator.match)
  });
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  submit() {
    console.log(this.form);
    this.authService.registrate(this.email.value, this.password.value)
      .subscribe(data => console.log(data), error => console.log(error));
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
}
