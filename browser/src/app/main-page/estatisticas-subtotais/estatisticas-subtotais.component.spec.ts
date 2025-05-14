import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasSubtotaisComponent } from './estatisticas-subtotais.component';

describe('EstatisticasSubtotaisComponent', () => {
  let component: EstatisticasSubtotaisComponent;
  let fixture: ComponentFixture<EstatisticasSubtotaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstatisticasSubtotaisComponent]
    });
    fixture = TestBed.createComponent(EstatisticasSubtotaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
