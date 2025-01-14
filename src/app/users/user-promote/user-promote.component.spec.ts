import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPromoteComponent } from './user-promote.component';

describe('UserPromoteComponent', () => {
  let component: UserPromoteComponent;
  let fixture: ComponentFixture<UserPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPromoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
