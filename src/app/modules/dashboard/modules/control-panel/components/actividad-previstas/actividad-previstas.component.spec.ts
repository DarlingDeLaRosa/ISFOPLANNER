import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadPrevistasComponent } from './actividad-previstas.component';

describe('ActividadPrevistasComponent', () => {
  let component: ActividadPrevistasComponent;
  let fixture: ComponentFixture<ActividadPrevistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadPrevistasComponent]
    });
    fixture = TestBed.createComponent(ActividadPrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
