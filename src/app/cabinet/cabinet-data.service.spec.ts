import { TestBed } from '@angular/core/testing';

import { CabinetDataService } from './cabinet-data.service';

describe('CabinetDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabinetDataService = TestBed.get(CabinetDataService);
    expect(service).toBeTruthy();
  });
});
