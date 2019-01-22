import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffIncidentHistoryComponent } from './staff-incident-history.component';

describe('StaffIncidentHistoryComponent', () => {
  let component: StaffIncidentHistoryComponent;
  let fixture: ComponentFixture<StaffIncidentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffIncidentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffIncidentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
