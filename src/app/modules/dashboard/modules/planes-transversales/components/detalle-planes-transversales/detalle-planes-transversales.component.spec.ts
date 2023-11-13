import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePlanesTransversalesComponent } from './detalle-planes-transversales.component';

describe('DetallePlanesTransversalesComponent', () => {
  let component: DetallePlanesTransversalesComponent;
  let fixture: ComponentFixture<DetallePlanesTransversalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePlanesTransversalesComponent]
    });
    fixture = TestBed.createComponent(DetallePlanesTransversalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
