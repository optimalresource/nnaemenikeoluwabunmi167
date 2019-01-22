import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatrolTeamComponent } from './edit-patrol-team.component';

describe('EditPatrolTeamComponent', () => {
  let component: EditPatrolTeamComponent;
  let fixture: ComponentFixture<EditPatrolTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatrolTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatrolTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
