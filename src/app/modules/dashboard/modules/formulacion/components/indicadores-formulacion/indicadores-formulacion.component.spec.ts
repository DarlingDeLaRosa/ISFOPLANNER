import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresFormulacionComponent } from './indicadores-formulacion.component';

describe('IndicadoresFormulacionComponent', () => {
  let component: IndicadoresFormulacionComponent;
  let fixture: ComponentFixture<IndicadoresFormulacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicadoresFormulacionComponent]
    });
    fixture = TestBed.createComponent(IndicadoresFormulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
