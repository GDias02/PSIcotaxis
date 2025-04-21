import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristaCreateComponent } from './motorista-create.component';

describe('MotoristaCreateComponent', () => {
  let component: MotoristaCreateComponent;
  let fixture: ComponentFixture<MotoristaCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotoristaCreateComponent]
    });
    fixture = TestBed.createComponent(MotoristaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
