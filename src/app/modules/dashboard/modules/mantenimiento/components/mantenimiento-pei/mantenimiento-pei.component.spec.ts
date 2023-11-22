import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPeiComponent } from './mantenimiento-pei.component';

describe('MantenimientoPeiComponent', () => {
  let component: MantenimientoPeiComponent;
  let fixture: ComponentFixture<MantenimientoPeiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantenimientoPeiComponent]
    });
    fixture = TestBed.createComponent(MantenimientoPeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
