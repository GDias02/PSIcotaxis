import { TestBed } from '@angular/core/testing';

import { MoradaService } from './morada.service';

describe('MoradaService', () => {
  let service: MoradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
