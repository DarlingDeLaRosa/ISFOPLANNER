import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionSubunidadesComponent } from './asignacion-subunidades.component';

describe('AsignacionSubunidadesComponent', () => {
  let component: AsignacionSubunidadesComponent;
  let fixture: ComponentFixture<AsignacionSubunidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionSubunidadesComponent]
    });
    fixture = TestBed.createComponent(AsignacionSubunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
