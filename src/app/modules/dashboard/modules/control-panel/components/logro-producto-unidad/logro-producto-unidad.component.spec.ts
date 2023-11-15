import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogroProductoUnidadComponent } from './logro-producto-unidad.component';

describe('LogroProductoUnidadComponent', () => {
  let component: LogroProductoUnidadComponent;
  let fixture: ComponentFixture<LogroProductoUnidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogroProductoUnidadComponent]
    });
    fixture = TestBed.createComponent(LogroProductoUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
