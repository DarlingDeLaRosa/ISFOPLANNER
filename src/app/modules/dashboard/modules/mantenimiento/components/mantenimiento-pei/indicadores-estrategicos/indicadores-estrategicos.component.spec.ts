import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresEstrategicosComponent } from './indicadores-estrategicos.component';

describe('IndicadoresEstrategicosComponent', () => {
  let component: IndicadoresEstrategicosComponent;
  let fixture: ComponentFixture<IndicadoresEstrategicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicadoresEstrategicosComponent]
    });
    fixture = TestBed.createComponent(IndicadoresEstrategicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
