import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidentTypeComponent } from './add-incident-type.component';

describe('AddIncidentTypeComponent', () => {
  let component: AddIncidentTypeComponent;
  let fixture: ComponentFixture<AddIncidentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncidentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncidentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
