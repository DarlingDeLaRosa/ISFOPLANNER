import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnwerViewComponent } from './asnwer-view.component';

describe('AsnwerViewComponent', () => {
  let component: AsnwerViewComponent;
  let fixture: ComponentFixture<AsnwerViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsnwerViewComponent]
    });
    fixture = TestBed.createComponent(AsnwerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
