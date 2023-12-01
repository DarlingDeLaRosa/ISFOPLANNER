import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionPeriodosComponent } from './configuracion-periodos.component';

describe('ConfiguracionPeriodosComponent', () => {
  let component: ConfiguracionPeriodosComponent;
  let fixture: ComponentFixture<ConfiguracionPeriodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionPeriodosComponent]
    });
    fixture = TestBed.createComponent(ConfiguracionPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
