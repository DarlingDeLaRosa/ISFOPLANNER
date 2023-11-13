import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMonitoreoComponent } from './producto-monitoreo.component';

describe('ProductoMonitoreoComponent', () => {
  let component: ProductoMonitoreoComponent;
  let fixture: ComponentFixture<ProductoMonitoreoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoMonitoreoComponent]
    });
    fixture = TestBed.createComponent(ProductoMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
