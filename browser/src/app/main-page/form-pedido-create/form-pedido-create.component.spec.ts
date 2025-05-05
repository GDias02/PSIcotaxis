import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPedidoCreateComponent } from './form-pedido-create.component';

describe('FormPedidoCreateComponent', () => {
  let component: FormPedidoCreateComponent;
  let fixture: ComponentFixture<FormPedidoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPedidoCreateComponent]
    });
    fixture = TestBed.createComponent(FormPedidoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
