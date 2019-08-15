import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTimeComponent } from './notification-time.component';

describe('NotificationTimeComponent', () => {
  let component: NotificationTimeComponent;
  let fixture: ComponentFixture<NotificationTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
