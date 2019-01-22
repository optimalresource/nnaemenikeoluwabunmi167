import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPatrolMembersComponent } from './all-patrol-members.component';

describe('AllPatrolMembersComponent', () => {
  let component: AllPatrolMembersComponent;
  let fixture: ComponentFixture<AllPatrolMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPatrolMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPatrolMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
