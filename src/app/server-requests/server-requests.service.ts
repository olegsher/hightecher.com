import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ServerRequestsService {


  // urlServer = 'https://ht-users.herokuapp.com';
  urlRegisterUser = environment.urls.registerUser;
  urlChangeNotificationTime = environment.urls.notificationTime;
  urlChangeName = environment.urls.name;
  urlChangePhone = environment.urls.phone;
  urlChangeEmail = environment.urls.email;

  constructor(private http: HttpClient) { }
  public registerUser(username: string, email: string, password: string, name: string, surname: string, phone: string) {

    const DEFAULT_NOTIFICATION_TIME = {
      1: ['00:00', '23:59'],
      2: ['00:00', '23:59'],
      3: ['00:00', '23:59'],
      4: ['00:00', '23:59'],
      5: ['00:00', '23:59'],
      6: ['00:00', '23:59'],
      7: ['00:00', '23:59']
    };
    const DEFAULT_TIME_ZONE = 'Asia/Jerusalem';
    const body = {
      username, email, password, name, surname, phone, notificationTime: DEFAULT_NOTIFICATION_TIME, timeZone: DEFAULT_TIME_ZONE
    };
    return this.http.post(this.urlRegisterUser, body);
  }

  public setNotificationTime(notificationTime) {

    const body = {
      notificationTime,
      timeZone: 'Asia/Jerusalem'
    };
    return this.http.post(this.urlChangeNotificationTime, body);
  }

  public getUserData() {

    // return this.http.get(this.server, {email: 'al.bogorad@gmail.com'});
  }
  public setName(name) {
    const body = {
      name,
      surname: null
    };
    return this.http.post(this.urlChangeName, body);
  }
  public setSurname(surname) {
    const body = {
      surname,
      name: null
    };
    return this.http.post(this.urlChangeName, body);
  }
  public setPhone(phone) {
    const body = {
      phone
    };
    return this.http.post(this.urlChangePhone, body);
  }
  public setEmail(email) {
    const body = {
      email
    };
    return this.http.post(this.urlChangeEmail, body);

  urlServer = 'https://ht-users.herokuapp.com';
  urlRegisterUser = '/';
  urlGetUserProfileBy = '/';

  constructor(private http: HttpClient) { }
  public registerUser(username: string, email: string, password: string, name: string, surname: string, phone: string) {
    const body = {
      username, email, password, name, surname, phone
    };
    return this.http.post(this.urlServer + this.urlRegisterUser, body);

  }
}
