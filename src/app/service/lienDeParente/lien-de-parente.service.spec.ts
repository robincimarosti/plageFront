import { TestBed } from '@angular/core/testing';

import { LienDeParenteService } from './lien-de-parente.service';

describe('LienDeParenteService', () => {
  let service: LienDeParenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienDeParenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
