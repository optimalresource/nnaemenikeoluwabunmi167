import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualtyDetailsComponent } from './casualty-details.component';

describe('CasualtyDetailsComponent', () => {
  let component: CasualtyDetailsComponent;
  let fixture: ComponentFixture<CasualtyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualtyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualtyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
