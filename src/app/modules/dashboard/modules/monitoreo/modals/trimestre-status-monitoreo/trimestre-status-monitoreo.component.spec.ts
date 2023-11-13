import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimestreStatusMonitoreoComponent } from './trimestre-status-monitoreo.component';

describe('TrimestreStatusMonitoreoComponent', () => {
  let component: TrimestreStatusMonitoreoComponent;
  let fixture: ComponentFixture<TrimestreStatusMonitoreoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrimestreStatusMonitoreoComponent]
    });
    fixture = TestBed.createComponent(TrimestreStatusMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
