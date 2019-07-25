import { Component, OnInit } from '@angular/core';
import {ConfirmPasswordValidator} from '../../registration/confirm-password-validator';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CabinetDataService} from '../cabinet-data.service';
import {ServerRequestsService} from '../../server-requests/server-requests.service';
import {Subject} from 'rxjs';
import {debounceTime, filter, skip} from 'rxjs/operators';


@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {
  form$ = {

    name: {
      sub$: new Subject<AbstractControl>(),
      formControl: 'first_name',
      method: 'setName'
    },
    surname: {
      sub$: new Subject<AbstractControl>(),
      formControl: 'surname',
      method: 'setSurname'
    },
    phone: {
      sub$: new Subject<AbstractControl>(),
      formControl: 'phone',
      method: 'setPhone'
    },
    email: {
      sub$: new Subject<AbstractControl>(),
      formControl: 'email',
      method: 'setEmail'
    },
  };


  constructor(private cabinetData: CabinetDataService, private serverRequest: ServerRequestsService) { }
  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern('(\\+972-5)|(\\+9725)|(05.)\\d{7}')]),
  });
  ngOnInit() {
    // this.other$.pipe(
    //   debounceTime(1000),
    //   skip(1),
    //   filter(other => !other.invalid),
    // ).subscribe(other =>
    //   this.serverRequest.setName({other: other.value}).subscribe(response => console.log(response)));
    //
    //
    // this.surname$.pipe(
    //   debounceTime(1000),
    //   skip(1),
    //   filter(surname => !surname.invalid),
    // ).subscribe(surname =>
    //   this.serverRequest.setName({surname: surname.value}).subscribe(response => console.log(response)));
    for(let key in this.form$) {
      this.form$[key].sub$.pipe(
        debounceTime(1000),
        // skip(1),
// @ts-ignore
        filter(data => !data.invalid),
      ).subscribe(data =>
        this.serverRequest[this.form$[key].method](data.value).subscribe(response => console.log(response)));
    }


    this.cabinetData.getCabinetData().subscribe(cabinetData => {
      this.userName.setValue(cabinetData.name);
      this.surname.setValue(cabinetData.surname);
      this.email.setValue(cabinetData.email);
      this.phone.setValue(cabinetData.phone);
    });
  }
  get userName() {
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


  changeName() {
    this.form$.name.sub$.next(this.userName);
  }
  changeSurname() {
    this.form$.surname.sub$.next(this.surname);
  }
  changePhone() {
    this.form$.phone.sub$.next(this.phone);
  }
  changeEmail() {
    this.form$.email.sub$.next(this.email);
  }

}
