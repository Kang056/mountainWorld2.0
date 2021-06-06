import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeBoxComponent } from './freeze-box.component';

describe('FreezeBoxComponent', () => {
  let component: FreezeBoxComponent;
  let fixture: ComponentFixture<FreezeBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreezeBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
