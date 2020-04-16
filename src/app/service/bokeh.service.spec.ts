import { TestBed } from '@angular/core/testing';

import { BokehService } from './bokeh.service';

describe('BokehService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BokehService = TestBed.get(BokehService);
    expect(service).toBeTruthy();
  });
});
