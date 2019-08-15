import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private fireAuth: AngularFireAuth) {

    console.log('!!!!!!');
    fireAuth.user.subscribe(user => console.log(user));
    fireAuth.auth.onIdTokenChanged(next => {
      console.log('onIdTokenChanged');
      next.getIdToken(true).then(a => {
        console.log(a);
        console.log(
          fireAuth.auth.currentUser.getIdToken());
      });
    });
  }

  public login(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  public getUserData() {
    return this.fireAuth.user;
  }
  public logout() {
    this.fireAuth.auth.signOut();
    return true;
  }
  public getToken() {
    return this.fireAuth.auth.currentUser.getIdToken();
  }

  // public renewAuth() {
  //   const fireUrl = 'https://securetoken.googleapis.com/v1/token?key=';
  //   const fireKey = environment.firebaseConfig.apiKey;
  //   const url = fireUrl + fireKey;
  //   const refreshToken = localStorage.getItem('refresh_token');
  //   const body = {
  //     grant_type: 'refresh_token',
  //     refresh_token: refreshToken
  //   };
  //   return this.http.post(url, body);
  // }
  //
  // public loginWithIdToken() {
  //
  //   const refreshToken = localStorage.getItem('refresh_token');
  //   return this.fireAuth.auth.signInWithCustomToken(refreshToken);
  // }

}
