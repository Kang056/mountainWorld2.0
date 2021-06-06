import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexLoadingComponent } from './index-loading.component';

describe('IndexLoadingComponent', () => {
  let component: IndexLoadingComponent;
  let fixture: ComponentFixture<IndexLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
