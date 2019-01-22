import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTaskComponent } from './supervisor-task.component';

describe('SupervisorTaskComponent', () => {
  let component: SupervisorTaskComponent;
  let fixture: ComponentFixture<SupervisorTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
