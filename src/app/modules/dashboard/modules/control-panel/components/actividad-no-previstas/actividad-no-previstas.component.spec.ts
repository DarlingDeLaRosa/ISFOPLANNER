import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadNoPrevistasComponent } from './actividad-no-previstas.component';

describe('ActividadNoPrevistasComponent', () => {
  let component: ActividadNoPrevistasComponent;
  let fixture: ComponentFixture<ActividadNoPrevistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadNoPrevistasComponent]
    });
    fixture = TestBed.createComponent(ActividadNoPrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
