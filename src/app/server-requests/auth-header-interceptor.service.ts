import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }
  environment2 = environment;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(this.environment2);
    if (req.url !== this.environment2.urls.registerUser && req.url !== this.environment2.urls.profile) {
      // console.log('access_token exist');
      return this.auth.getUserData().pipe(mergeMap(user => {
        // console.log('mM');
        // console.log(user.ra);
        // @ts-ignore
        req = req.clone({headers: new HttpHeaders().append('X-Firebase-Auth', user.ra)});
        return next.handle(req);
      }));
      // req = req.clone({headers: new HttpHeaders().append('X-Firebase-Auth', this.getAsyncToken())});
    }
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        // if (event instanceof HttpResponse) {
        //   console.log('not intercepted!');
        // }
      })
    );
  }


}
