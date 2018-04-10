import { TestBed, inject } from '@angular/core/testing';

import { FundsService } from './funds.service';

describe('FundsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundsService]
    });
  });

  it('should be created', inject([FundsService], (service: FundsService) => {
    expect(service).toBeTruthy();
  }));
});
