import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlRegistration = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCV9314AHICFTroOq2GzEyozrEvLk6B9yQ';
  urlLogin = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCV9314AHICFTroOq2GzEyozrEvLk6B9yQ';
  constructor(private http: HttpClient) { }
  public registrate(email: string, password: string) {
    const body = {
      email, password,
      returnSecureToken: true
    }
    return this.http.post(this.urlRegistration, body);
  }
  public login(email: string, password: string){
    const body = {
      email, password,
      returnSecureToken: true
    }
    return this.http.post(this.urlLogin, body);
  }
}
