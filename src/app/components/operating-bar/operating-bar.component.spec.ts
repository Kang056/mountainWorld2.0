import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingBarComponent } from './operating-bar.component';

describe('OperatingBarComponent', () => {
  let component: OperatingBarComponent;
  let fixture: ComponentFixture<OperatingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatingBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
