import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadListViewComponent } from './responsible-view.component';

describe('EntidadListViewComponent', () => {
  let component: EntidadListViewComponent;
  let fixture: ComponentFixture<EntidadListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntidadListViewComponent]
    });
    fixture = TestBed.createComponent(EntidadListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
