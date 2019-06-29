import { TestBed } from '@angular/core/testing';

import { SwUpdateService } from './sw-update.service';

describe('SwUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwUpdateService = TestBed.get(SwUpdateService);
    expect(service).toBeTruthy();
  });
});
