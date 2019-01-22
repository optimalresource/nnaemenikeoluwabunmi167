import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrolMemberDetailsComponent } from './patrol-member-details.component';

describe('PatrolMemberDetailsComponent', () => {
  let component: PatrolMemberDetailsComponent;
  let fixture: ComponentFixture<PatrolMemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrolMemberDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrolMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
