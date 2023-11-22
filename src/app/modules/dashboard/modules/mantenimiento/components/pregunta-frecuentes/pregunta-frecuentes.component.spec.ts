import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaFrecuentesComponent } from './pregunta-frecuentes.component';

describe('PreguntaFrecuentesComponent', () => {
  let component: PreguntaFrecuentesComponent;
  let fixture: ComponentFixture<PreguntaFrecuentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntaFrecuentesComponent]
    });
    fixture = TestBed.createComponent(PreguntaFrecuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
