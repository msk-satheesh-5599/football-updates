import { TestBed } from '@angular/core/testing';

import { TeamsService } from './teams.service';
import { HttpClientModule } from '@angular/common/http';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
