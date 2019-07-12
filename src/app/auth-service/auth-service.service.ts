import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private fireAuth: AngularFireAuth) {
  }
  public login(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  public getUserData() {
    console.log(this.fireAuth.auth.currentUser);
    return this.fireAuth.user;
  }
  public logout() {
    this.fireAuth.auth.signOut();
    return true;
  }
}
