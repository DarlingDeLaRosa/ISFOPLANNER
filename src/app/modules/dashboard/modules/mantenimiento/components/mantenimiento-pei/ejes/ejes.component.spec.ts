import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjesComponent } from './ejes.component';

describe('EjesComponent', () => {
  let component: EjesComponent;
  let fixture: ComponentFixture<EjesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EjesComponent]
    });
    fixture = TestBed.createComponent(EjesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
