import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagemCustoComponent } from './viagem-custo.component';

describe('ViagemCustoComponent', () => {
  let component: ViagemCustoComponent;
  let fixture: ComponentFixture<ViagemCustoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViagemCustoComponent]
    });
    fixture = TestBed.createComponent(ViagemCustoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
