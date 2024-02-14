import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleViewComponent } from './responsible-view.component';

describe('ResponsibleViewComponent', () => {
  let component: ResponsibleViewComponent;
  let fixture: ComponentFixture<ResponsibleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsibleViewComponent]
    });
    fixture = TestBed.createComponent(ResponsibleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
