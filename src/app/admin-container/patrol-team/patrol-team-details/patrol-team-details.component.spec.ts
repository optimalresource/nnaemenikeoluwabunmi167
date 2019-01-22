import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrolTeamDetailsComponent } from './patrol-team-details.component';

describe('PatrolTeamDetailsComponent', () => {
  let component: PatrolTeamDetailsComponent;
  let fixture: ComponentFixture<PatrolTeamDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrolTeamDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrolTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
