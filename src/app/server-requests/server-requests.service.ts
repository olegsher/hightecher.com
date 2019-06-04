import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerRequestsService {

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
