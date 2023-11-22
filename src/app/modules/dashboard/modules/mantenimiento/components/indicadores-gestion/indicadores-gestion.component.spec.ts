import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresGestionComponent } from './indicadores-gestion.component';

describe('IndicadoresGestionComponent', () => {
  let component: IndicadoresGestionComponent;
  let fixture: ComponentFixture<IndicadoresGestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicadoresGestionComponent]
    });
    fixture = TestBed.createComponent(IndicadoresGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
