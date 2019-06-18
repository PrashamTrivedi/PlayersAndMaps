import { TestBed } from '@angular/core/testing';

import { DatalayerService } from './datalayer.service';

describe('DatalayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatalayerService = TestBed.get(DatalayerService);
    expect(service).toBeTruthy();
  });
});
