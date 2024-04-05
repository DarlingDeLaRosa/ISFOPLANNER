import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesInvolucradosComponent } from './actividades-involucrados.component';

describe('ActividadesInvolucradosComponent', () => {
  let component: ActividadesInvolucradosComponent;
  let fixture: ComponentFixture<ActividadesInvolucradosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesInvolucradosComponent]
    });
    fixture = TestBed.createComponent(ActividadesInvolucradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
