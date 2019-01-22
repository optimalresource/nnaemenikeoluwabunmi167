import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeIncidentsComponent } from './visualize-incidents.component';

describe('VisualizeIncidentsComponent', () => {
  let component: VisualizeIncidentsComponent;
  let fixture: ComponentFixture<VisualizeIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizeIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizeIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
