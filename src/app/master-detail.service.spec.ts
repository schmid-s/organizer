import { TestBed } from '@angular/core/testing';

import { MasterDetailService } from './master-detail.service';

describe('MasterDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterDetailService = TestBed.get(MasterDetailService);
    expect(service).toBeTruthy();
  });
});
