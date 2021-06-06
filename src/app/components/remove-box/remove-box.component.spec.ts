import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBoxComponent } from './remove-box.component';

describe('RemoveBoxComponent', () => {
  let component: RemoveBoxComponent;
  let fixture: ComponentFixture<RemoveBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
