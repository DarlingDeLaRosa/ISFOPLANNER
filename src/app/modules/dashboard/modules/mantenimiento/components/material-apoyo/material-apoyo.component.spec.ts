import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialApoyoComponent } from './material-apoyo.component';

describe('MaterialApoyoComponent', () => {
  let component: MaterialApoyoComponent;
  let fixture: ComponentFixture<MaterialApoyoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialApoyoComponent]
    });
    fixture = TestBed.createComponent(MaterialApoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
