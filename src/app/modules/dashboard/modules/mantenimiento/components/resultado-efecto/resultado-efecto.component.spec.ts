import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoEfectoComponent } from './resultado-efecto.component';

describe('ResultadoEfectoComponent', () => {
  let component: ResultadoEfectoComponent;
  let fixture: ComponentFixture<ResultadoEfectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultadoEfectoComponent]
    });
    fixture = TestBed.createComponent(ResultadoEfectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
