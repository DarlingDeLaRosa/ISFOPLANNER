import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadEditarMonitoreoComponent } from './actividad-editar-monitoreo.component';

describe('ActividadEditarMonitoreoComponent', () => {
  let component: ActividadEditarMonitoreoComponent;
  let fixture: ComponentFixture<ActividadEditarMonitoreoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadEditarMonitoreoComponent]
    });
    fixture = TestBed.createComponent(ActividadEditarMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
