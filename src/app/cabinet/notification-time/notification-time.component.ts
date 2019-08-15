import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServerRequestsService} from '../../server-requests/server-requests.service';
import {CabinetDataService} from '../cabinet-data.service';
import {forEach} from '@angular/router/src/utils/collection';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
// import { observe } from 'rxjs-observe';
import {debounceTime, distinctUntilChanged, filter, skip, switchMapTo, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-notification-time',
  templateUrl: './notification-time.component.html',
  styleUrls: ['./notification-time.component.css']
})
export class NotificationTimeComponent implements OnInit {
  data$ = new Subject<FormGroup>();
  notificationData;
  DAYS_OF_WEEK = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday'
  };
  form = new FormGroup({
    1: new FormArray([]),
    2: new FormArray([]),
    3: new FormArray([]),
    4: new FormArray([]),
    5: new FormArray([]),
    6: new FormArray([]),
    7: new FormArray([])
  });
  constructor(private cabinetData: CabinetDataService, private serverRequest: ServerRequestsService) { }

  ngOnInit() {
    this.cabinetData.getCabinetData().subscribe(cabinetData => {
      this.notificationData = cabinetData.notificationTime;
      // console.log(this.notificationData);
      for (const day in this.notificationData) {
        const timeData = this.notificationData[day];
        for (let i = 0; i < timeData.length; i += 2) {
          this.addTimeRange(day);
          this.times(day).at(i).setValue(timeData[i]);
          this.times(day).at(i + 1).setValue(timeData[i + 1]);
        }
      }
    });
    this.data$.pipe(
      debounceTime(1000),
      skip(1),
      filter(form => !form.invalid),
    ).subscribe(form =>
      this.serverRequest.setNotificationTime(form.value).subscribe(response => console.log(response)));
  }

  get monday() {
    return (this.form.get('2') as FormArray).controls;
  }
  get days() {
    return this.form.controls;
  }
  get daysKeys() {
    return Object.keys(this.days);
  }
  times(day): FormArray {
    return (this.form.get(day) as FormArray);
  }
  // submit() {
  //   // console.log(this.monday[0].value);
  //   // console.log(this.form.value);
  //   this.serverRequest.setNotificationTime(this.form.value).subscribe(data => console.log(data));
  // }

  addTimeRange(day) {
    this.times(day).push(new FormControl('', Validators.required));
    this.times(day).push(new FormControl('', Validators.required));
    this.ch();
  }
  removeTimeRange(day, time) {
    this.times(day).removeAt(time);
    this.times(day).removeAt(time);
    this.ch();
  }

  ch() {
    this.data$.next(this.form);
  }
}
