import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPositionsComponent } from './all-positions.component';

describe('AllPositionsComponent', () => {
  let component: AllPositionsComponent;
  let fixture: ComponentFixture<AllPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
