import { TestBed } from '@angular/core/testing';

import { StandingsService } from './standings.service';
import { HttpClientModule } from '@angular/common/http';

describe('StandingsService', () => {
  let service: StandingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(StandingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
