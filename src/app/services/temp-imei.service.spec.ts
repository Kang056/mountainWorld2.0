import { TestBed } from '@angular/core/testing';

import { TempImeiService } from './temp-imei.service';

describe('TempImeiService', () => {
  let service: TempImeiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempImeiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
