import { TestBed, inject } from '@angular/core/testing';

import { HistoricService } from './historic.service';

describe('HistoricService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoricService]
    });
  });

  it('should be created', inject([HistoricService], (service: HistoricService) => {
    expect(service).toBeTruthy();
  }));
});
