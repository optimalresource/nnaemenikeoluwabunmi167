import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignTaskComponent } from './reasign-task.component';

describe('ReasignTaskComponent', () => {
  let component: ReasignTaskComponent;
  let fixture: ComponentFixture<ReasignTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasignTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasignTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
