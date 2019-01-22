import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatrolMemberComponent } from './edit-patrol-member.component';

describe('EditPatrolMemberComponent', () => {
  let component: EditPatrolMemberComponent;
  let fixture: ComponentFixture<EditPatrolMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatrolMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatrolMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
