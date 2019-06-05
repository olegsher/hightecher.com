import { TestBed } from '@angular/core/testing';

import { ServerRequestsService } from './server-requests.service';

describe('ServerRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerRequestsService = TestBed.get(ServerRequestsService);
    expect(service).toBeTruthy();
  });
});
