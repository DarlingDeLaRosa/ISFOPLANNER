import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorVistaMetaComponent } from './indicador-vista-meta.component';

describe('IndicadorVistaMetaComponent', () => {
  let component: IndicadorVistaMetaComponent;
  let fixture: ComponentFixture<IndicadorVistaMetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicadorVistaMetaComponent]
    });
    fixture = TestBed.createComponent(IndicadorVistaMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
