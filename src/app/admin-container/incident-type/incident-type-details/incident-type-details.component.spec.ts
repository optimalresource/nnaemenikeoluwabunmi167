import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentTypeDetailsComponent } from './incident-type-details.component';

describe('IncidentTypeDetailsComponent', () => {
  let component: IncidentTypeDetailsComponent;
  let fixture: ComponentFixture<IncidentTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
