import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeTasksComponent } from './visualize-tasks.component';

describe('VisualizeTasksComponent', () => {
  let component: VisualizeTasksComponent;
  let fixture: ComponentFixture<VisualizeTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizeTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizeTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
