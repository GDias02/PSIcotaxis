import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristaViagemComponent } from './motorista-viagem.component';

describe('MotoristaViagemComponent', () => {
  let component: MotoristaViagemComponent;
  let fixture: ComponentFixture<MotoristaViagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotoristaViagemComponent]
    });
    fixture = TestBed.createComponent(MotoristaViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
