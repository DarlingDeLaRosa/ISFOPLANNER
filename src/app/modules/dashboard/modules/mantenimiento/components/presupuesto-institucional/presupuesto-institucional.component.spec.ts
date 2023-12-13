import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoInstitucionalComponent } from './presupuesto-institucional.component';

describe('PresupuestoInstitucionalComponent', () => {
  let component: PresupuestoInstitucionalComponent;
  let fixture: ComponentFixture<PresupuestoInstitucionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresupuestoInstitucionalComponent]
    });
    fixture = TestBed.createComponent(PresupuestoInstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
