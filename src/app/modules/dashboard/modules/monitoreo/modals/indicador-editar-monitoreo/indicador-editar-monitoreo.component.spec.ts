import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorEditarMonitoreoComponent } from './indicador-editar-monitoreo.component';

describe('IndicadorEditarMonitoreoComponent', () => {
  let component: IndicadorEditarMonitoreoComponent;
  let fixture: ComponentFixture<IndicadorEditarMonitoreoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicadorEditarMonitoreoComponent]
    });
    fixture = TestBed.createComponent(IndicadorEditarMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
