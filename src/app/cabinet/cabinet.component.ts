import {Component, OnDestroy, OnInit} from '@angular/core';
import {CabinetDataService} from './cabinet-data.service';
import {AuthService} from '../auth-service/auth-service.service';
import {mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit, OnDestroy {
  subs;
  isLogIn = localStorage.getItem('X-Firebase-Auth');
  constructor(private cabinetData: CabinetDataService, private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.getUserData().subscribe(user => {
      if (user !== null) {
        this.cabinetData.downloadCabinetData();
        this.cabinetData.getCabinetData().subscribe(data => {
          this.subs = data;
        })
      }
    });
  }


  ngOnDestroy(): void {
  }

  getUser() {
    return this.auth.getUserData();
  }
}
