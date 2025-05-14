import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasTotaisComponent } from './estatisticas-totais.component';

describe('EstatisticasTotaisComponent', () => {
  let component: EstatisticasTotaisComponent;
  let fixture: ComponentFixture<EstatisticasTotaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstatisticasTotaisComponent]
    });
    fixture = TestBed.createComponent(EstatisticasTotaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
