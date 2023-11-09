import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorEditarComponent } from './indicador-editar.component';

describe('IndicadorEditarComponent', () => {
  let component: IndicadorEditarComponent;
  let fixture: ComponentFixture<IndicadorEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicadorEditarComponent]
    });
    fixture = TestBed.createComponent(IndicadorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
