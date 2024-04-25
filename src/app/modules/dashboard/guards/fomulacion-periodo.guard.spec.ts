import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { fomulacionPeriodoGuard } from './fomulacion-periodo.guard';

describe('fomulacionPeriodoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => fomulacionPeriodoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
