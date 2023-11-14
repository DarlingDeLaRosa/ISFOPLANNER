import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiAreaTrabajoComponent } from './mi-area-trabajo.component';

describe('MiAreaTrabajoComponent', () => {
  let component: MiAreaTrabajoComponent;
  let fixture: ComponentFixture<MiAreaTrabajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiAreaTrabajoComponent]
    });
    fixture = TestBed.createComponent(MiAreaTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
