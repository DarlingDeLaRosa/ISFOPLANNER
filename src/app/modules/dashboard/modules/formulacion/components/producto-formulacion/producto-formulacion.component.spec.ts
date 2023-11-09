import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormulacionComponent } from './producto-formulacion.component';

describe('ProductoFormulacionComponent', () => {
  let component: ProductoFormulacionComponent;
  let fixture: ComponentFixture<ProductoFormulacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoFormulacionComponent]
    });
    fixture = TestBed.createComponent(ProductoFormulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
