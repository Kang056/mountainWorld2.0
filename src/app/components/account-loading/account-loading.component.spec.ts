import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLoadingComponent } from './account-loading.component';

describe('AccountLoadingComponent', () => {
  let component: AccountLoadingComponent;
  let fixture: ComponentFixture<AccountLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
