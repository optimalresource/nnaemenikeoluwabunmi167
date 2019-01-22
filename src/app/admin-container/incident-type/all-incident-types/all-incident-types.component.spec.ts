import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIncidentTypesComponent } from './all-incident-types.component';

describe('AllIncidentTypesComponent', () => {
  let component: AllIncidentTypesComponent;
  let fixture: ComponentFixture<AllIncidentTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllIncidentTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllIncidentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
