import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorEditarRecintosComponent } from './indicador-editar-recintos.component';

describe('IndicadorEditarRecintosComponent', () => {
  let component: IndicadorEditarRecintosComponent;
  let fixture: ComponentFixture<IndicadorEditarRecintosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicadorEditarRecintosComponent]
    });
    fixture = TestBed.createComponent(IndicadorEditarRecintosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
