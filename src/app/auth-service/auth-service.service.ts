import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private fireAuth: AngularFireAuth) {

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


}
