import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristasComponent } from './motoristas.component';

describe('MotoristasComponent', () => {
  let component: MotoristasComponent;
  let fixture: ComponentFixture<MotoristasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotoristasComponent]
    });
    fixture = TestBed.createComponent(MotoristasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
