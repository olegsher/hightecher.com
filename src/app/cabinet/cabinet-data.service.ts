import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CabinetDataService {
  cabinetData: Observable<any>;

constructor(private http: HttpClient) {
    this.downloadCabinetData();
  }


  public downloadCabinetData() {
    interface Response {
      data: object;
    };
    const body = {
      uid: localStorage.getItem('hig-uid')
    };
    this.cabinetData = this.http.post(environment.urls.profile, body)
      .pipe(map(response => (response as Response).data));
    return true;
  }
  public getCabinetData(): Observable<any> {
    return this.cabinetData;
  }
}
