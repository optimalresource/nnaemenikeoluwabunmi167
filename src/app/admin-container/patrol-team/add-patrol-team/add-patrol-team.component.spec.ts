import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatrolTeamComponent } from './add-patrol-team.component';

describe('AddPatrolTeamComponent', () => {
  let component: AddPatrolTeamComponent;
  let fixture: ComponentFixture<AddPatrolTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPatrolTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatrolTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
