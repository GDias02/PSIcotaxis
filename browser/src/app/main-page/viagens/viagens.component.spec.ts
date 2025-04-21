import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagensComponent } from './viagens.component';

describe('ViagensComponent', () => {
  let component: ViagensComponent;
  let fixture: ComponentFixture<ViagensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViagensComponent]
    });
    fixture = TestBed.createComponent(ViagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
