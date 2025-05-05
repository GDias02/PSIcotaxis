import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCreateFormComponent } from './pedido-create-form.component';

describe('PedidoCreateFormComponent', () => {
  let component: PedidoCreateFormComponent;
  let fixture: ComponentFixture<PedidoCreateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoCreateFormComponent]
    });
    fixture = TestBed.createComponent(PedidoCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
