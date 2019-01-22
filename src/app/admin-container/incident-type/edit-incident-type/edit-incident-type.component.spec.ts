import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncidentTypeComponent } from './edit-incident-type.component';

describe('EditIncidentTypeComponent', () => {
  let component: EditIncidentTypeComponent;
  let fixture: ComponentFixture<EditIncidentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIncidentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIncidentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
