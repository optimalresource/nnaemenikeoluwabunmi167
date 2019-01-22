import { TestBed } from '@angular/core/testing';

import { VisualizeDataService } from './visualize-data.service';

describe('VisualizeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisualizeDataService = TestBed.get(VisualizeDataService);
    expect(service).toBeTruthy();
  });
});
