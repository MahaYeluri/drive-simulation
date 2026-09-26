import { TestBed } from '@angular/core/testing';

import { Simulationservice } from './simulationservice';

describe('Simulationservice', () => {
  let service: Simulationservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Simulationservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
