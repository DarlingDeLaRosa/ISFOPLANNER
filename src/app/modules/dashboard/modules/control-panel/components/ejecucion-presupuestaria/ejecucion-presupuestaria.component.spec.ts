import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionPresupuestariaComponent } from './ejecucion-presupuestaria.component';

describe('EjecucionPresupuestariaComponent', () => {
  let component: EjecucionPresupuestariaComponent;
  let fixture: ComponentFixture<EjecucionPresupuestariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EjecucionPresupuestariaComponent]
    });
    fixture = TestBed.createComponent(EjecucionPresupuestariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
