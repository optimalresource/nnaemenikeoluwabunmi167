import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCasualtyComponent } from './edit-casualty.component';

describe('EditCasualtyComponent', () => {
  let component: EditCasualtyComponent;
  let fixture: ComponentFixture<EditCasualtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCasualtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCasualtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
