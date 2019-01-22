import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatrolMemberComponent } from './add-patrol-member.component';

describe('AddPatrolMemberComponent', () => {
  let component: AddPatrolMemberComponent;
  let fixture: ComponentFixture<AddPatrolMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPatrolMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatrolMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
