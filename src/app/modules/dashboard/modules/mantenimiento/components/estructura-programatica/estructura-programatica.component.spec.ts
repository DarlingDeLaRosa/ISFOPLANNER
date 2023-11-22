import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraProgramaticaComponent } from './estructura-programatica.component';

describe('EstructuraProgramaticaComponent', () => {
  let component: EstructuraProgramaticaComponent;
  let fixture: ComponentFixture<EstructuraProgramaticaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstructuraProgramaticaComponent]
    });
    fixture = TestBed.createComponent(EstructuraProgramaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
