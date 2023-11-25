import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParasolsComponent } from './parasols.component';

describe('ParasolsComponent', () => {
  let component: ParasolsComponent;
  let fixture: ComponentFixture<ParasolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParasolsComponent]
    });
    fixture = TestBed.createComponent(ParasolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
