import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesFormulacionComponent } from './actividades-formulacion.component';

describe('ActividadesFormulacionComponent', () => {
  let component: ActividadesFormulacionComponent;
  let fixture: ComponentFixture<ActividadesFormulacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesFormulacionComponent]
    });
    fixture = TestBed.createComponent(ActividadesFormulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
