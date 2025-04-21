import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradaCreateComponent } from './morada-create.component';

describe('MoradaCreateComponent', () => {
  let component: MoradaCreateComponent;
  let fixture: ComponentFixture<MoradaCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoradaCreateComponent]
    });
    fixture = TestBed.createComponent(MoradaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
