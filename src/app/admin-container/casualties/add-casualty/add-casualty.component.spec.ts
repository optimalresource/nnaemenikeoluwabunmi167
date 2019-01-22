import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCasualtyComponent } from './add-casualty.component';

describe('AddCasualtyComponent', () => {
  let component: AddCasualtyComponent;
  let fixture: ComponentFixture<AddCasualtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCasualtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCasualtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
