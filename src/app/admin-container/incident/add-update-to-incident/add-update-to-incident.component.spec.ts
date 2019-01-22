import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateToIncidentComponent } from './add-update-to-incident.component';

describe('AddUpdateToIncidentComponent', () => {
  let component: AddUpdateToIncidentComponent;
  let fixture: ComponentFixture<AddUpdateToIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateToIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateToIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
