import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarBoleiaComponent } from './dar-boleia.component';

describe('DarBoleiaComponent', () => {
  let component: DarBoleiaComponent;
  let fixture: ComponentFixture<DarBoleiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DarBoleiaComponent]
    });
    fixture = TestBed.createComponent(DarBoleiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
