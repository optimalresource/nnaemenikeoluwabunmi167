import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCasualtiesComponent } from './all-casualties.component';

describe('AllCasualtiesComponent', () => {
  let component: AllCasualtiesComponent;
  let fixture: ComponentFixture<AllCasualtiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCasualtiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCasualtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
