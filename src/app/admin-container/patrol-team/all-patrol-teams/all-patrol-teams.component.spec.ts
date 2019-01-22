import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPatrolTeamsComponent } from './all-patrol-teams.component';

describe('AllPatrolTeamsComponent', () => {
  let component: AllPatrolTeamsComponent;
  let fixture: ComponentFixture<AllPatrolTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPatrolTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPatrolTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
