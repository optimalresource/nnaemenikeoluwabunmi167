import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentFormsComponent } from './incident-forms.component';

describe('IncidentFormsComponent', () => {
  let component: IncidentFormsComponent;
  let fixture: ComponentFixture<IncidentFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
