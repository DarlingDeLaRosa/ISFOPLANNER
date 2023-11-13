import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizMonitoreoComponent } from './matriz-monitoreo.component';

describe('MatrizMonitoreoComponent', () => {
  let component: MatrizMonitoreoComponent;
  let fixture: ComponentFixture<MatrizMonitoreoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatrizMonitoreoComponent]
    });
    fixture = TestBed.createComponent(MatrizMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
