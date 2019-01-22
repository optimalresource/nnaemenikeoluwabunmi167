import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserRolesComponent } from './all-user-roles.component';

describe('AllUserRolesComponent', () => {
  let component: AllUserRolesComponent;
  let fixture: ComponentFixture<AllUserRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUserRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
