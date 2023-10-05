import { TestBed } from '@angular/core/testing';

import { ParasolService } from './parasol.service';

describe('ParasolService', () => {
  let service: ParasolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParasolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
