import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasDetailsComponent } from './estatisticas-details.component';

describe('EstatisticasDetailsComponent', () => {
  let component: EstatisticasDetailsComponent;
  let fixture: ComponentFixture<EstatisticasDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstatisticasDetailsComponent]
    });
    fixture = TestBed.createComponent(EstatisticasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
